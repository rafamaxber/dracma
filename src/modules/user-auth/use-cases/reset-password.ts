import {
  ExceptionFilter,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../../../database/prisma/prisma.service';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { HashService } from '../../../cripto/hash/hash.service';

@Injectable()
export class ResetPasswordUsecase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute({
    password,
    token,
  }: ResetPasswordDto): Promise<{ message: string }> {
    console.log('ResetPasswordUsecase:: ', password);

    try {
      const tokenPayloadData = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_RESET_PASSWORD_SECRET,
      });
      console.log('tokenPayloadData:: ', tokenPayloadData);

      if (!tokenPayloadData) {
        return {
          message: 'User password updated',
        };
      }

      const passwordHash = await this.hashService.hash(password);
      await this.prismaService.user.update({
        where: {
          email: tokenPayloadData.email,
        },
        data: {
          password: passwordHash,
        },
      });
      console.log('User password updated:: ', tokenPayloadData.email);
    } catch (error) {
      console.error('Error:: ', error);
      throw new UnauthorizedException({
        message: 'Não foi possivel atualizar a senha do usuário',
      });
    }

    return {
      message: 'User password updated',
    };
  }
}
