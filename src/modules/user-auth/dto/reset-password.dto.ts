import { IsString, Length, IsJWT } from 'class-validator';

export class ResetPasswordDto {
  @Length(6, 30)
  @IsString()
  password: string;

  @IsString()
  @IsJWT()
  token: string;
}
