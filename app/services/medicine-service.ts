import { equalTo, get, limitToLast, orderByChild, push, Query, query, ref, remove, set } from 'firebase/database';
import { Medicine } from '../models/medicine';
import { database } from './firebase-service';

export class MedicineService {
  private readonly basePath: string = 'medicines';

  async add(medicine: Medicine): Promise<void> {
    await push(ref(database, this.basePath), medicine);
  }

  async get(medicineId: string): Promise<Medicine | null> {
    const snapshot = await get(ref(database, `${this.basePath}/${medicineId}`));
    return snapshot.val();
  }

  async delete(medicineId: string): Promise<void> {
    await remove(ref(database, `${this.basePath}/${medicineId}`));
  }

  async update(medicineId: string, medicine: Medicine): Promise<void> {
    await set(ref(database, `${this.basePath}/${medicineId}`), medicine);
  }

  watch(patientId: string): Query {
    return query(ref(database, this.basePath), orderByChild('patientId'), equalTo(patientId));
  }

  watchLast(patientId: string): Query {
    return query(ref(database, this.basePath), orderByChild('patientId'), equalTo(patientId), limitToLast(3));
  }
}
