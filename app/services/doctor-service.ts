import { DatabaseReference, get, push, query, ref, set } from 'firebase/database';
import { Doctor } from '../models/doctor';
import { database } from './firebase-service';

export class DoctorService {
  async add(doctor: Doctor): Promise<void> {
    await push(ref(database, 'doctors'), doctor);
  }

  async get(doctorId: string): Promise<Doctor | null> {
    const snapshot = await get(query(ref(database, `doctors/${doctorId}`)));
    return snapshot.val();
  }

  async update(doctorId: string, doctor: Doctor): Promise<void> {
    await set(ref(database, `doctors/${doctorId}`), doctor);
  }

  watch(doctorId: string): DatabaseReference {
    return ref(database, `doctors/${doctorId}`);
  }

  watchAll(): DatabaseReference {
    return ref(database, 'doctors');
  }
}
