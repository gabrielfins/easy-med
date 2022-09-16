import { useState, useEffect, useMemo, createContext, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Patient } from '../models/patient';
import { auth } from '../services/firebase-service';
import { PatientService } from '../services/patient-serivce';

interface AuthContextType {
  patient: Patient | null;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [patient, setPatient] = useState<Patient | null>(null);

  const patientService = useMemo(() => new PatientService(), []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      try {
        const patient = await patientService.get(user.uid);
        setPatient(patient);
      } catch (error) {
        console.log(error);
      }
    });

    return unsubscribe;
  }, [])

  return (
    <AuthContext.Provider value={{ patient, setPatient }}>
      {children}
    </AuthContext.Provider>
  );
}
