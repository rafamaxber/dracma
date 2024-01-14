import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3, 30)
  firstName: string;

  @Length(3, 30)
  @IsString()
  lastName: string;

  @Length(3, 30)
  @IsString()
  nickName: string;

  @IsEmail()
  email: string;

  @Length(6, 30)
  @IsString()
  password: string;
}
