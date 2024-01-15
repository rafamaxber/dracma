import { IsString, IsEmail, Length } from 'class-validator';

export class ForgotPasswordUserDto {
  @IsEmail()
  email: string;
}
