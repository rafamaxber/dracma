import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUsecase } from './use-cases/register';
import { UserAlreadyExistsException } from '../../exceptions/user-already-exists-exception';
import { SignInUsecase } from './use-cases/sign-in';
import { SigInUserDto } from './dto/sigin-user.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private registerUsecase: RegisterUsecase,
    private signInUsecase: SignInUsecase,
  ) {}

  @Public()
  @Post('login')
  async signIn(@Body() sigInUserDto: SigInUserDto) {
    return this.signInUsecase.execute(sigInUserDto);
  }

  @Public()
  @Post('register')
  @UseFilters(new UserAlreadyExistsException())
  async register(@Body() createUserDto: CreateUserDto) {
    return this.registerUsecase.execute(createUserDto);
  }
}
