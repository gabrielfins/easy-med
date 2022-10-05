import { DatabaseReference, get, push, query, ref, set } from 'firebase/database';
import { Doctor } from '../models/doctor';
import { database } from './firebase-service';

export class DoctorService {
  private readonly basePath: string = 'doctors';

  async add(doctor: Doctor): Promise<void> {
    await push(ref(database, 'doctors'), doctor);
  }

  async get(doctorId: string): Promise<Doctor | null> {
    const snapshot = await get(query(ref(database, `${this.basePath}/${doctorId}`)));
    return snapshot.val();
  }

  async update(doctorId: string, doctor: Doctor): Promise<void> {
    await set(ref(database, `${this.basePath}/${doctorId}`), doctor);
  }

  watch(doctorId: string): DatabaseReference {
    return ref(database, `${this.basePath}/${doctorId}`);
  }

  watchAll(): DatabaseReference {
    return ref(database, this.basePath);
  }
}
