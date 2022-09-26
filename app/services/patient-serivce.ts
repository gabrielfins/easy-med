import { DatabaseReference, get, push, query, ref, set } from 'firebase/database';
import { Patient } from '../models/patient';
import { database } from './firebase-service';

export class PatientService {
  async add(patient: Patient): Promise<void> {
    await push(ref(database, 'patients'), patient);
  }

  async get(patientId: string): Promise<Patient | null> {
    const snapshot = await get(query(ref(database, `patients/${patientId}`)));
    return snapshot.val();
  }

  async update(patientId: string, patient: Patient): Promise<void> {
    await set(ref(database, `patients/${patientId}`), patient);
  }

  watch(patientId: string): DatabaseReference {
    return ref(database, `patients/${patientId}`);
  }
}
