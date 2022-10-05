import { useState, useEffect, useMemo, createContext, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Patient } from '../models/patient';
import { auth } from '../services/firebase-service';
import { PatientService } from '../services/patient-serivce';
import { onValue } from 'firebase/database';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../services/doctor-service';

interface AuthContextType {
  user: User | null | undefined;
  patient: Patient | null | undefined;
  doctor: Doctor | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null | undefined>>;
  setDoctor: React.Dispatch<React.SetStateAction<Doctor | null | undefined>>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null | undefined>();
  const [patient, setPatient] = useState<Patient | null | undefined>();
  const [doctor, setDoctor] = useState<Doctor | null | undefined>();

  const patientService = useMemo(() => new PatientService(), []);
  const doctorService = useMemo(() => new DoctorService(), []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      
      if (!user) return;

      onValue(patientService.watch(user.uid), (snapshot) => {
        setPatient(snapshot.val());
      });

      onValue(doctorService.watch(user.uid), (snapshot) => {
        setDoctor(snapshot.val());
      });
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, patient, doctor, setUser, setPatient, setDoctor }}>
      {children}
    </AuthContext.Provider>
  );
}
