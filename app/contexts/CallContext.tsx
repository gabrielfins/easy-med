import { createContext, ReactNode, useRef, useState } from 'react';
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../services/firebase-service';

interface CallContextType {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  webcamStarted: boolean;
  channelId: string | null;
  startWebcam: () => Promise<void>;
  startCall: () => Promise<string | void>;
  joinCall: (callId: string) => Promise<void>;
}

interface CallContextProviderProps {
  children: ReactNode;
}

export const CallContext = createContext({} as CallContextType);

export default function CallContextProvider({ children }: CallContextProviderProps) {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [channelId, setChannelId] = useState<string | null>(null);
  
  const [webcamStarted, setWebcamStarted] = useState(false);
  
  const pc = useRef<RTCPeerConnection>();

  const servers: RTCConfiguration = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ]
      }
    ],
    iceCandidatePoolSize: 10
  };

  const startWebcam = async () => {
    pc.current = new RTCPeerConnection(servers);

    const local = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    local.getTracks().forEach(track => pc.current?.addTrack(track, local));
    setLocalStream(local);

    const remote = new MediaStream();
    setRemoteStream(remote);

    pc.current.ontrack = (e) => {
      e.streams[0].getTracks().forEach(track => remote.addTrack(track));
    };

    setWebcamStarted(true);
  };

  const startCall = async () => {
    const channelDoc = doc(collection(firestore, 'channels'));
    const offerCandidates = collection(channelDoc, 'offerCandidates');
    const answerCandidates = collection(channelDoc, 'answerCandidates');

    setChannelId(channelDoc.id);

    if (!pc.current) return;

    pc.current.onicecandidate = async (e) => {
      if (!e.candidate) return;
      await addDoc(offerCandidates, e.candidate.toJSON());
    }

    const offerDescription = await pc.current.createOffer();
    await pc.current.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type
    }

    await setDoc(channelDoc, { offer });

    onSnapshot(channelDoc, (snapshot) => {
      const data = snapshot.data();
      if (!pc.current?.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.current?.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          pc.current?.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    return channelDoc.id;
  };

  const joinCall = async (callId: string) => {
    const channelDoc = doc(collection(firestore, 'channels'), callId);
    const offerCandidates = collection(channelDoc, 'offerCandidates');
    const answerCandidates = collection(channelDoc, 'answerCandidates');

    if (!pc.current) return;

    pc.current.onicecandidate = async (e) => {
      if (!e.candidate) return;
      await addDoc(answerCandidates, e.candidate.toJSON());
    };

    const channelDocument = await getDoc(channelDoc);
    const channelData = channelDocument.data();

    const offerDescription = channelData?.offer;

    await pc.current.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.current.createAnswer();
    await pc.current.setLocalDescription(answerDescription);

    const answer = {
      sdp: answerDescription.sdp,
      type: answerDescription.type
    }

    await updateDoc(channelDoc, { answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          pc.current?.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  return (
    <CallContext.Provider value={{remoteStream, localStream, channelId, webcamStarted, startWebcam, startCall, joinCall}}>
      {children}
    </CallContext.Provider>
  );
}
