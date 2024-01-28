import { Injectable } from '@nestjs/common';
import { GenericCrud } from '../../../crud-base/generic-crud-service';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { ProductResponse } from '../dto/productResponse.dto';

@Injectable()
export class FindProductUseCase extends GenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.product);
  }

  async execute(companyExternalId: string, id: number): Promise<any> {
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);
    const result = await this.prismaService.product.findFirst({
      where: {
        id,
        companyId: tennatId,
      },
      include: {
        product_category_map: {
          where: {
            deletedAt: null,
            companyId: tennatId,
          },
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
        unit: {
          select: {
            id: true,
            name: true,
          },
        },
        productImages: {
          select: {
            isMain: true,
            imageUrl: true,
          },
        },
      },
    });

    return new ProductResponse().map(result as any);
  }
}
