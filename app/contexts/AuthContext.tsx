import { useState, useEffect, useMemo, createContext, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Patient } from '../models/patient';
import { auth } from '../services/firebase-service';
import { PatientService } from '../services/patient-serivce';

interface AuthContextType {
  user: User | null;
  patient: Patient | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);

  const patientService = useMemo(() => new PatientService(), []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      setUser(user);
      patientService.get(user.uid)
        .then(setPatient)
        .catch(console.log);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, patient, setUser, setPatient }}>
      {children}
    </AuthContext.Provider>
  );
}
