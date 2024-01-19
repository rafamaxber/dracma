import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { GenericCrud } from '../../crud-base/generic-crud-service';

@Injectable()
export class CategoryService extends GenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.category);
  }

  async create(body: any): Promise<any> {
    const result = await this.prismaService.category.create({
      data: body,
    });

    return result;
  }
}
