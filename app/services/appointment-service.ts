import { equalTo, get, limitToLast, orderByChild, push, query, ref, remove } from 'firebase/database';
import { database } from './firebase-service';
import { Appointment } from '../models/appointment';

export class AppointmentService {
  private readonly basePath: string = 'appointments';

  async create(appointment: Appointment): Promise<void> {
    await push(ref(database, this.basePath), appointment);
  }

  async get(appointmentId: string): Promise<Appointment | null> {
    const snapshot = await get(ref(database, `${this.basePath}/${appointmentId}`));
    return snapshot.val();
  }

  async getFromPatient(patientId: string): Promise<Record<string, Appointment> | null> {
    const snapshot = await get(query(ref(database, this.basePath), orderByChild('patientId'), equalTo(patientId)));
    return snapshot.val();
  }

  async delete(appointmentId: string): Promise<void> {
    await remove(ref(database, `${this.basePath}/${appointmentId}`));
  }

  watchFromPatient(patientId: string) {
    return query(ref(database, this.basePath), orderByChild('patientId'), equalTo(patientId));
  }

  watchFromDoctor(doctorId: string) {
    return query(ref(database, this.basePath), orderByChild('doctorId'), equalTo(doctorId));
  }

  watchLastFromPatient(patientId: string) {
    return query(ref(database, this.basePath), orderByChild('patientId'), equalTo(patientId), limitToLast(3));
  }

  watchLastFromDoctor(doctorId: string) {
    return query(ref(database, this.basePath), orderByChild('doctorId'), equalTo(doctorId), limitToLast(3));
  }
}
