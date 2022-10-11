import { DatabaseReference, equalTo, get, limitToLast, orderByChild, push, query, ref, remove, set } from 'firebase/database';
import { database } from './firebase-service';
import { Call } from '../models/call';

export class CallService {
  private readonly basePath: string = 'calls';

  async add(call: Call): Promise<DatabaseReference> {
    return await push(ref(database, this.basePath), call);
  }

  async get(callId: string): Promise<Call | null> {
    const snapshot = await get(ref(database, `${this.basePath}/${callId}`));
    return snapshot.val();
  }

  async update(callId: string, call: Call): Promise<void> {
    await set(ref(database, `${this.basePath}/${callId}`), call);
  }

  async delete(callId: string): Promise<void> {
    await remove(ref(database, `${this.basePath}/${callId}`));
  }

  watchFromPatient(patientId: string) {
    return query(ref(database, this.basePath), orderByChild('patientId'), equalTo(patientId), limitToLast(1));
  }

  watchFromDoctor(doctorId: string) {
    return query(ref(database, this.basePath), orderByChild('doctorId'), equalTo(doctorId), limitToLast(1));
  }

  watchCall(callId: string) {
    return query(ref(database, `${this.basePath}/${callId}`));
  }
}
