export class UserDto {
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
