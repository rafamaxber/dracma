import { Injectable } from '@nestjs/common';
import { GenericCrud } from '../../../crud-base/generic-crud-service';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class UpdateProductUseCase extends GenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.product);
  }

  async execute(
    companyExternalId: string,
    id: number,
    product: UpdateProductDto,
  ): Promise<any> {
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);

    const result = await this.prismaService.product.update({
      where: {
        companyId: tennatId,
        id,
      },
      data: {
        name: product?.name,
        company: {
          connect: {
            id: tennatId,
          },
        },
        product_category_map: {
          deleteMany: {
            productId: id,
            companyId: tennatId,
          },
          createMany: {
            data: product?.categories?.map((categoryId) => ({
              categoryId,
              companyId: tennatId,
            })),
          },
        },
        unit: product?.unitId && {
          connect: {
            id: Number(product?.unitId),
          },
        },
        code: product?.code,
        canBeResold: product?.canBeResold,
        price_sell: product?.price_sell,
        price_cost: product?.price_cost,
        manufacturer: product?.manufacturer,
        barcode: product?.barcode,
        status: product?.status,
        quantity: product?.quantity,
        description: product?.description,
        weight: product?.weight,
        stock: product?.stock,
        stock_min: product?.stock_min,
        stock_max: product?.stock_max,
        removeFeedstockFromStock: product?.removeFeedstockFromStock,
      },
    });

    return result;
  }
}
