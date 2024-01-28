import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { AdminGenericCrud } from '../../crud-base/admin-generic-crud-service';

@Injectable()
export class UnitsService extends AdminGenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.unit);
  }
}
