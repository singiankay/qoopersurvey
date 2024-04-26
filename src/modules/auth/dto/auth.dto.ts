export class UserDto {
  constructor(data?: {
    email: string;
    firstname: string;
    lastname: string;
    id: number;
    role: Role;
  }) {
    this.email = data?.email;
    this.firstname = data?.firstname;
    this.id = data?.id;
    this.lastname = data?.lastname;
    this.role = data?.role;
  }

  id: number;
  email: string;
  password: string;
  role: Role;
  firstname: string;
  lastname: string;
}

export enum Role {
  User = 'User',
  Admin = 'Admin',
}
