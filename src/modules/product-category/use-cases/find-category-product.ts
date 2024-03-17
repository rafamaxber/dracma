import { Injectable } from '@nestjs/common';
import { GenericCrud } from '../../../crud-base/generic-crud-service';
import { PrismaService } from '../../../database/prisma/prisma.service';

@Injectable()
export class FindCategoryProductsUseCase extends GenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.productCategory);
  }

  async execute(companyExternalId: string, id: number): Promise<any> {
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);
    const result = await this.prismaService.productCategory.findFirst({
      where: {
        id,
        companyId: tennatId,
      },
      select: {
        id: true,
        name: true,
        color: true,
        images: true,
      },
    });

    return {
      ...result,
      images: result.images.map((image) => image.imageUrl),
    };
  }
}
