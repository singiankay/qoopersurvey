import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  User = 'User',
  Admin = 'Admin',
}

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
  @ApiProperty({
    description: 'User ID',
  })
  id: number;

  @ApiProperty({
    description: 'User email',
  })
  email: string;

  @ApiProperty({
    description: 'User Password',
  })
  password: string;

  @ApiProperty({
    description: 'Role',
    enum: Role,
  })
  role: Role;

  @ApiProperty({
    description: 'Firstname',
  })
  firstname: string;

  @ApiProperty({
    description: 'Lastname',
  })
  lastname: string;
}
