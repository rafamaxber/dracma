import { Role } from '@prisma/client';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  password: string;
  role: Role;
}
