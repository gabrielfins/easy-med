import { equalTo, get, orderByChild, push, Query, query, ref, remove, set } from 'firebase/database';
import { Medicine } from '../models/medicine';
import { database } from './firebase-service';

export class MedicineService {
  async add(medicine: Medicine): Promise<void> {
    await push(ref(database, 'medicines'), medicine);
  }

  async get(medicineId: string): Promise<Medicine | null> {
    const snapshot = await get(ref(database, `medicines/${medicineId}`));
    return snapshot.val();
  }

  async delete(medicineId: string): Promise<void> {
    await remove(ref(database, `medicines/${medicineId}`));
  }

  async update(medicineId: string, medicine: Medicine): Promise<void> {
    await set(ref(database, `medicines/${medicineId}`), medicine);
  }

  watch(patientId: string): Query {
    return query(ref(database, 'medicines'), orderByChild('patientId'), equalTo(patientId));
  }
}
