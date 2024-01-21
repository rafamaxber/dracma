import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { GenericCrud } from '../../crud-base/generic-crud-service';

@Injectable()
export class CustomerService extends GenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.customer);
  }
}