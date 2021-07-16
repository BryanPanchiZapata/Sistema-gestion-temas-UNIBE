export interface ProfileModel {
  ci: string;
  email: string;
  firstName: string;
  secondName: string;
  secondLastname: string;
  id: string;
  lastName: string;
  password: string;
  role: string;
  sign: string;
  career:{
      name:string;
      faculty:{
          name:string
      }
  }
}
