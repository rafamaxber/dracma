import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../../../database/prisma/prisma.service';
import { SigInUserDto } from '../dto/sigin-user.dto';
import { SendEmailService } from '../../../email/send-email';
import { ForgotPasswordUserDto } from '../dto/forgot-password-user.dto';

@Injectable()
export class ForgotPasswordUsecase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly sendEmailService: SendEmailService,
    private readonly jwtService: JwtService,
  ) {}

  async execute({
    email,
  }: ForgotPasswordUserDto): Promise<{ message: string }> {
    console.log('ForgotPasswordUsecase:: ', email);
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      console.log('User not found:: ', email);
      return {
        message: 'User found correctly',
      };
    }

    const tokenPayloadData = {
      email: user.email,
    };

    const token = await this.jwtService.signAsync(tokenPayloadData, {
      expiresIn: process.env.JWT_RESET_PASSWORD_EXPIRES_IN,
      secret: process.env.JWT_RESET_PASSWORD_SECRET,
    });

    console.log('token:: ', token);

    await this.sendEmailService.execute({
      from: 'DRACMA',
      subject: 'Reset password',
      text: `https://localhost:3000/reset-password/${token}`,
      to: user.email,
    });

    return {
      message: 'User found correctly',
    };
  }
}
