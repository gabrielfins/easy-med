export interface Patient {
  name: string;
  cpf: string;
  birthday: string;
  gender?: 'm' | 'f';
  height?: number;
  weight?: number;
  bloodType?: `${'A' | 'B' | 'AB' | 'O'}${'+' | '-'}`;
  email: string;
  phoneNumber?: string;
}
