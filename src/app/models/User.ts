import {Address} from "./Address";

export class User {
  idUser: number = 0;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  phoneNumber: string = "";
  // password: string = "";
  // confirmPassword: string = "";
  role: string = "";
  createdDate: string = "";
  address: Address = new Address();
}
