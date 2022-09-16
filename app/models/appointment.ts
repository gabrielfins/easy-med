export interface Appointment {
  patientId: string;
  doctorId: string;
  type: 'presential' | 'online';
  date: string;
  location: string;
  price: number;
  isDone: boolean;
}
