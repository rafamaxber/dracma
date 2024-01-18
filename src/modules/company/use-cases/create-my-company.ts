import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateMyCompanyDto } from '../dto/create-my-company.dto';

import { UserAuthType } from '../../../modules/user-auth/entity/user-auth';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CreateMyCompanyUsecase {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async execute(body: CreateMyCompanyDto) {
    const {
      // description,
      initialBalanceDate,
      name,
      userId,
      planId = null,
    } = body;

    const user = await this.prismaService.user.findUnique({
      where: {
        idExternal: userId,
      },
    });

    const result = await this.prismaService.$transaction(async (tsx) => {
      const company = await tsx.company.upsert({
        create: {
          id: user.id,
          // description,
          initialBalanceDate,
          name,
          planId,
        },
        update: {
          initialBalanceDate,
          planId,
        },
        where: {
          id: user.id,
        },
      });

      if (user.companyId) {
        return company;
      }

      await tsx.user.update({
        where: {
          idExternal: userId,
        },
        data: {
          companyId: company.id,
        },
      });

      return company;
    });

    const tokenPayloadData: UserAuthType = {
      id: user.idExternal,
      companyId: result.idExternal,
      firstName: user.firstName,
      lastName: user.lastName,
      nickName: user.nickName,
    };

    const token = await this.jwtService.signAsync(tokenPayloadData);

    return {
      access_token: token,
    };
  }
}
