import { useEffect, useMemo, ReactNode } from 'react';
import { CallService } from '../services/call-service';
import { onValue } from 'firebase/database';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-native';

interface CallGuardProps {
  children: ReactNode;
}

export default function CallGuard({ children }: CallGuardProps) {
  const { patient, doctor } = useAuth();

  const navigate = useNavigate();

  const callService = useMemo(() => new CallService(), []);

  useEffect(() => {
    const unsubPatient = onValue(callService.watchFromPatient(patient?.id || ''), (snapshot) => {
      if (snapshot.exists()) {
        const [id] = Object.keys(snapshot.val());
        navigate(`/call-started/${id}`);
      } else {
        navigate('/')
      }
    });

    const unsubDoctor = onValue(callService.watchFromDoctor(doctor?.id || ''), (snapshot) => {
      if (snapshot.exists()) {
        const [id] = Object.keys(snapshot.val());
        navigate(`/call-started/${id}`);
      } else {
        navigate('/')
      }
    });

    return () => {
      unsubPatient();
      unsubDoctor();
    };
  }, [patient?.id, doctor?.id]);

  return <>{children}</>;
}