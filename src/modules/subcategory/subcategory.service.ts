import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma/prisma.service';
import { GenericCrud } from '../../crud-base/generic-crud-service';

@Injectable()
export class SubcategoryService extends GenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.subcategory);
  }
}
