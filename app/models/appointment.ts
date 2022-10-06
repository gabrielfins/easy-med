export interface Appointment {
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string
  type: 'Presencial' | 'Online';
  date: string;
  location: string;
  price: number;
  isDone: boolean;
}
