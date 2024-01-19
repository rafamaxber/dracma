import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma/prisma.service';
import { SendEmailService } from '../../../email/send-email';
import { ForgotPasswordUserDto } from '../dto/forgot-password-user.dto';
import { emailTemplateConstants } from '../../../email/templates/template-constants';

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
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      Logger.error(
        `${ForgotPasswordUsecase.name}::Email not found [email: ${email}]`,
      );
      return {
        message: 'User found correctly',
      };
    }

    const emailTemplate = emailTemplateConstants.resetPassword;
    const tokenPayloadData = {
      email: user.email,
    };
    const token = await this.jwtService.signAsync(tokenPayloadData, {
      expiresIn: process.env.JWT_RESET_PASSWORD_EXPIRES_IN,
      secret: process.env.JWT_RESET_PASSWORD_SECRET,
    });

    this.sendEmailService
      .execute({
        template: emailTemplate,
        data: {
          token,
          firstName: user.firstName,
        },
        to: user.email,
      })
      .then(() => {
        Logger.debug(
          `${ForgotPasswordUsecase.name}::Email sent correctly: [template: ${emailTemplate}]`,
        );
      })
      .catch((error) => {
        Logger.error(
          `${ForgotPasswordUsecase.name}::Error sending email: [template: ${emailTemplate}] [user: ${user.email}]]`,
          error,
        );
      });

    return {
      message: 'User found correctly',
    };
  }
}
