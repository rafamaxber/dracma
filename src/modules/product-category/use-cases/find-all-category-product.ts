import { Injectable } from '@nestjs/common';
import { GenericCrud } from '../../../crud-base/generic-crud-service';
import { PrismaService } from '../../../database/prisma/prisma.service';
import {
  ProductCategory,
  ProductCategoryBuilder,
} from '../product-category-builder';

interface FindAllParams {
  filters?: {
    name?: string | null;
  };
}

@Injectable()
export class FindAllCategoryProductsUseCase extends GenericCrud {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productCategoryBuilder: ProductCategoryBuilder,
  ) {
    super(prismaService.productCategory);
  }

  async execute(
    companyExternalId: string,
    { filters }: FindAllParams,
  ): Promise<{
    results: ProductCategory[];
  }> {
    const mappedFilters = {
      filters: filters || {},
    };
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);
    const categoryInstance = this.prismaService.productCategory;

    const where = {};

    if (mappedFilters?.filters?.name) {
      where['name'] = {
        contains: mappedFilters.filters.name,
        mode: 'insensitive',
      };
    }

    const categories = await categoryInstance.findMany({
      where: {
        companyId: tennatId,
        deletedAt: null,
        ...where,
      },
      include: {
        images: {
          select: {
            imageUrl: true,
          },
        },
      },
    });

    const hierarchicalCategories =
      this.productCategoryBuilder.buildHierarchy(categories);

    return {
      results: hierarchicalCategories,
    };
  }
}
