import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUsecase } from './use-cases/register';
import { UserAlreadyExistsException } from '../../exceptions/user-already-exists-exception';
import { SignInUsecase } from './use-cases/sign-in';
import { SigInUserDto } from './dto/sigin-user.dto';
import { Public } from './public.decorator';
import { ForgotPasswordUsecase } from './use-cases/forgot-password';
import { ForgotPasswordUserDto } from './dto/forgot-password-user.dto';
import { ResetPasswordUsecase } from './use-cases/reset-password';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private registerUsecase: RegisterUsecase,
    private signInUsecase: SignInUsecase,
    private forgotPasswordUsecase: ForgotPasswordUsecase,
    private resetPasswordUsecase: ResetPasswordUsecase,
  ) {}

  @Public()
  @Post('login')
  async signIn(@Body() sigInUserDto: SigInUserDto) {
    return this.signInUsecase.execute(sigInUserDto);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordUserDto: ForgotPasswordUserDto) {
    return this.forgotPasswordUsecase.execute(forgotPasswordUserDto);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.resetPasswordUsecase.execute(resetPasswordDto);
  }

  @Public()
  @Post('register')
  @UseFilters(new UserAlreadyExistsException())
  async register(@Body() createUserDto: CreateUserDto) {
    return this.registerUsecase.execute(createUserDto);
  }
}
