import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { RegisterUsecase } from './use-cases/register';
import { HashService } from '../../cripto/hash/hash.service';
import { SignInUsecase } from './use-cases/sign-in';

@Module({
  controllers: [AuthController],
  providers: [RegisterUsecase, HashService, SignInUsecase],
})
export class AuthModule {}
