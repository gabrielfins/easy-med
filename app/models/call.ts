export interface Call {
  createdBy: 'patient' | 'doctor';
  callCode: string;
  patientId: string;
  doctorId: string;
  startedAt: string;
  hasAnswered: boolean;
  hasEnded: boolean;
}
