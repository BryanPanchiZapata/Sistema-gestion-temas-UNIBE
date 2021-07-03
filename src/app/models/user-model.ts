export interface UserModel {
  id?: string;
  ci?:string;
  email?:string;
  firstName?:string;
  lastName?: string;
  password?:string;
  role?:string;
  secondName?:string;
  secondLastName?:string;
}

export interface AcademicUser extends UserModel {
  career?:string;
  sign?:string;
}
