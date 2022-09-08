import { get, push, ref } from 'firebase/database';
import { database } from './firebase-service';
import { Appointment } from '../models/appointment';

export class AppointmentService {
  async addAppointment(appointment: Appointment): Promise<void> {
    push(ref(database, 'appointments'), appointment);
  }

  async getAppointment(userId: string): Promise<Appointment> {
    const snapshot = await get(ref(database, 'appointments'));
    return snapshot.val()
  }
}
