import { CareerModel } from './career-model';
export interface UserModel {
  id?: string;
  ci?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  role?: UserRole;
  secondName?: string;
  secondLastname?: string;
}

export interface UserAcademicModel extends UserModel {
  career?: CareerModel;
  sign?: string;
}

export enum UserRole {
  'Estudiante' = 'STUDENT',
  'Director de carrera' = 'CAREER_DIRECTOR',
  'Autoridad' = 'AUTHORITY',
  'Dirección Financiera' = 'FINANCIAL'
}



