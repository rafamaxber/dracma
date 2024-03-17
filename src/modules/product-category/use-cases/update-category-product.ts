import { Injectable } from '@nestjs/common';
import { GenericCrud } from '../../../crud-base/generic-crud-service';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { UpdateProductCategoryDto } from '../dto/update-product-category.dto';

@Injectable()
export class UpdateCategoryProductUseCase extends GenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.product);
  }

  async execute(
    companyExternalId: string,
    id: number,
    body: UpdateProductCategoryDto,
  ) {
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);
    const result = await this.prismaService.productCategory.update({
      where: {
        companyId: tennatId,
        id,
      },
      data: {
        companyId: tennatId,
        name: body.name,
        color: body?.color || null,

        images: {
          deleteMany: {
            categoryId: id,
            companyId: tennatId,
          },
          createMany: {
            data: body.images?.map((image) => ({
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
