import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/colors';
import { CallService } from '../services/call-service';
import { Call } from '../models/call';
import { DoctorService } from '../services/doctor-service';
import { Doctor } from '../models/doctor';
import { onValue } from 'firebase/database';
import { PatientService } from '../services/patient-serivce';
import { Patient } from '../models/patient';
import { useAuth } from '../hooks/use-auth';
import { useCall } from '../hooks/use-call';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppText from '../components/AppText';

export default function CallStarted() {
  const { patient, doctor } = useAuth();
  const { startWebcam, joinCall } = useCall();

  const params = useParams();
  const [call, setCall] = useState<Call | null>();
  const [callText, setCallText] = useState('.');

  const callService = useMemo(() => new CallService(), []);
  
  const [dbDoctor, setDoctor] = useState<Doctor | null>();
  const [dbPatient, setPatient] = useState<Patient | null>();

  const doctorService = useMemo(() => new DoctorService(), []);
  const patientService = useMemo(() => new PatientService(), []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) return;
    callService.get(params.id)
      .then(setCall)
      .catch(console.log);
  }, [params]);

  useEffect(() => {
    doctorService.get(call?.doctorId || '')
      .then(setDoctor)
      .catch(console.log);

    patientService.get(call?.patientId || '')
      .then(setPatient)
      .catch(console.log);
  }, [call]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCallText((c) => {
        if (c === '...'){ 
          return '.';
        } else {
          return c + '.';
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!call) return;
      callService.delete(call.callCode);
    }, 30000);

    return () => clearTimeout(timeout);
  }, [call]);

  useEffect(() => {
    if (!call) return;
    const unsubscribe = onValue(callService.watchCall(call.callCode), (snapshot) => {
      if (snapshot.exists() && snapshot.val().hasAnswered === true) {
        navigate(`/call/${call.callCode}`);
      }
    });
    
    return unsubscribe;
  }, [call]);

  const pickup = async () => {
    if (!params.id || !call) return;
    await startWebcam();
    await joinCall(params.id);
    await callService.update(params.id, {...call, hasAnswered: true});
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <MaterialIcons name={patient ? 'doctor' : doctor ? 'account' : 'null'} size={44} color={colors.primary} />
        </View>
        <AppText size={18}>{patient ? dbDoctor?.name : doctor ? dbPatient?.name : ''}</AppText>
      </View>
      <View style={styles.callContainer}>
        <AppText size={16}>{(patient && call?.createdBy === 'patient') || (doctor && call?.createdBy === 'doctor') ? 'Ligando' : 'Recebendo Ligação'}{callText}</AppText>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.hangup} activeOpacity={0.5} onPress={() => callService.delete(call?.callCode || '')}>
          <MaterialIcons name="phone-hangup" size={32} color={colors.white} />
        </TouchableOpacity>
        {(patient && call?.createdBy === 'doctor') || (doctor && call?.createdBy === 'patient') ? (
          <>
            <View style={{ width: 24 }} />
            <TouchableOpacity style={styles.pickup} activeOpacity={0.5} onPress={pickup}>
              <MaterialIcons name="phone" size={32} color={colors.white} />
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 60
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    marginBottom: 16,
    borderRadius: 45,
    backgroundColor: colors.secondary
  },
  callContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 60
  },
  hangup: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 50,
    borderRadius: 40,
    backgroundColor: colors.error
  },
  pickup: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 50,
    borderRadius: 40,
    backgroundColor: colors.primary
  }
});
