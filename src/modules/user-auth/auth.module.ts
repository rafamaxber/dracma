import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RegisterUsecase } from './use-cases/register';
import { HashService } from '../../cripto/hash/hash.service';
import { SignInUsecase } from './use-cases/sign-in';
import { ForgotPasswordUsecase } from './use-cases/forgot-password';
import { ResetPasswordUsecase } from './use-cases/reset-password';

@Module({
  controllers: [AuthController],
  providers: [
    RegisterUsecase,
    HashService,
    SignInUsecase,
    ForgotPasswordUsecase,
    ResetPasswordUsecase,
  ],
})
export class AuthModule {}
