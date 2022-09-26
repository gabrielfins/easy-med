import { BloodType } from "../types/blood-type";

export interface Patient {
  id: string;
  name: string;
  cpf: string;
  birthday: string;
  gender?: 'm' | 'f' | '';
  height?: number | '';
  weight?: number | '';
  bloodType?: BloodType | '';
  email: string;
  phoneNumber?: string;
}
