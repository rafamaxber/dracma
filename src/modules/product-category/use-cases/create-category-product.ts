import { Injectable } from '@nestjs/common';
import { GenericCrud } from '../../../crud-base/generic-crud-service';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';

@Injectable()
export class CreateCategoryProductUseCase extends GenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.product);
  }

  async execute(companyExternalId: string, body: CreateProductCategoryDto) {
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);
    const result = await this.prismaService.productCategory.create({
      data: {
        companyId: tennatId,
        name: body.name,
        color: body?.color || null,

        images: body?.images && {
          createMany: {
            data: body.images.map((image) => ({
              imageUrl: image,
              companyId: tennatId,
            })),
          },
        },
      },
      select: {
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
