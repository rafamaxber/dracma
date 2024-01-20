import { Injectable } from '@nestjs/common';
import { GenericCrud } from 'src/crud-base/generic-crud-service';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class CreateProductUseCase extends GenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.product);
  }

  async execute(
    companyExternalId: string,
    product: CreateProductDto,
  ): Promise<any> {
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);

    const result = await this.prismaService.product.create({
      data: {
        name: product.name,
        company: {
          connect: {
            id: tennatId,
          },
        },
        product_category_map: product?.categories && {
          createMany: {
            data: product.categories.map((categoryId) => ({
              categoryId,
              companyId: tennatId,
            })),
          },
        },
        productImages: product?.images && {
          createMany: {
            data: product.images.map((image) => ({
              imageUrl: image.url,
              isMain: image.main,
              companyId: tennatId,
            })),
          },
        },
        unit: product?.unitId && {
          connect: {
            id: Number(product?.unitId) || null,
          },
        },
        code: product?.code || null,
        canBeResold: product?.canBeResold || null,
        price_sell: product?.price_sell || null,
        price_cost: product?.price_cost || null,
        manufacturer: product?.manufacturer || null,
        barcode: product?.barcode || null,
        status: product?.status || null,
        quantity: product?.quantity || null,
        description: product?.description || null,
        weight: product?.weight || null,
        stock: product?.stock || null,
        stock_min: product?.stock_min || null,
        stock_max: product?.stock_max || null,
        removeFeedstockFromStock: product?.removeFeedstockFromStock || null,
      },
    });

    return result;
  }
}
