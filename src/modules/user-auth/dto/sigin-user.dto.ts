import { IsString, IsEmail, Length } from 'class-validator';

export class SigInUserDto {
  @IsEmail()
  email: string;

  @Length(6, 30)
  @IsString()
  password: string;
}
