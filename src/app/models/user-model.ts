export interface UserModel {
  id?: string;
  ci?:string;
  email?:string;
  firstName?:string;
  lastName?: string;
  password?:string;
  role?:UserRole;
  secondName?:string;
  secondLastname?:string;
}

export enum UserRole {
  STUDENT = "STUDENT",
	CAREER_DIRECTOR = "CAREER_DIRECTOR",
	AUTHORITY = "AUTHORITY",
	FINANCIAL = "FINANCIAL"
}
