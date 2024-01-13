import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateMyCompanyDto } from '../dto/create-my-company.dto';

@Injectable()
export class CreateMyCompanyUsecase {
  constructor(private readonly prismaService: PrismaService) {}
  async execute(body: CreateMyCompanyDto) {
    const {
      // description,
      initialBalanceDate,
      name,
      userId,
      planId = null,
    } = body;

    const { id: internalUserId, companyId: userCompanyId } =
      await this.prismaService.user.findUnique({
        where: {
          idExternal: userId,
        },
      });

    const result = await this.prismaService.$transaction(async (tsx) => {
      const company = await tsx.company.upsert({
        create: {
          id: internalUserId,
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
          id: internalUserId,
        },
      });

      if (userCompanyId) {
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

    return result;
  }
}
