import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { GenericCrud } from '../../crud-base/generic-crud-service';

@Injectable()
export class AccountService extends GenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.account);
  }
}
