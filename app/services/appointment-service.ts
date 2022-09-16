import { equalTo, get, limitToLast, orderByChild, push, query, ref } from 'firebase/database';
import { database } from './firebase-service';
import { Appointment } from '../models/appointment';

export class AppointmentService {
  async create(appointment: Appointment): Promise<void> {
    await push(ref(database, 'appointments'), appointment);
  }

  async get(patientId: string): Promise<Record<string, Appointment> | null> {
    const snapshot = await get(query(ref(database, 'appointments'), orderByChild('patientId'), equalTo(patientId)));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  }

  watch(patientId: string) {
    return query(ref(database, 'appointments'), orderByChild('patientId'), equalTo(patientId), limitToLast(3));
  }
}
