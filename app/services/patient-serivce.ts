import { DatabaseReference, get, push, query, ref, set } from 'firebase/database';
import { Patient } from '../models/patient';
import { database } from './firebase-service';

export class PatientService {
  private readonly basePath: string = 'patients';

  async add(patient: Patient): Promise<void> {
    await push(ref(database, this.basePath), patient);
  }

  async get(patientId: string): Promise<Patient | null> {
    const snapshot = await get(query(ref(database, `${this.basePath}/${patientId}`)));
    return snapshot.val();
  }

  async update(patientId: string, patient: Patient): Promise<void> {
    await set(ref(database, `${this.basePath}/${patientId}`), patient);
  }

  watch(patientId: string): DatabaseReference {
    return ref(database, `${this.basePath}/${patientId}`);
  }
}
