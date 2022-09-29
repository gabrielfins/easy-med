export interface Doctor {
  id: string;
  name: string;
  cpf: string;
  crm: string;
  specialty: string;
  birthday: string;
  gender?: 'm' | 'f' | '';
  locations?: Record<string, string>;
  availability?: Record<string, string>;
  email: string;
  phoneNumber?: string;
  consultType: 'online' | 'presential' | 'both' | '';
}
