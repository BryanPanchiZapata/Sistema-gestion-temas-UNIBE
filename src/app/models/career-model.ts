import { FacultyModel } from './faculty-model';
export interface CareerModel {
  id?:string;
  name?:string;
  degree?:string;
  faculty?:FacultyModel
}

