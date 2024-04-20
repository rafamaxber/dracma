import { Injectable } from '@nestjs/common';
import { GenericCrud } from '../../../crud-base/generic-crud-service';
import { PrismaService } from '../../../database/prisma/prisma.service';

interface FindAllParams {
  perPage?: number;
  page?: number;
  orderBy?: string;
  orderType?: 'asc' | 'desc';
  filters?: {
    name?: string | null;
  };
}

@Injectable()
export class FindAllCategoryProductsUseCase extends GenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.productCategory);
  }

  async execute(
    companyExternalId: string,
    { perPage, page, orderBy, orderType, filters }: FindAllParams,
  ): Promise<{
    results: any;
    pagination: { page: number; perPage: number; total: number };
  }> {
    const mappedFilters = {
      perPage: Number(perPage || 5),
      page: page || 1,
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

    const [total, results] = await new PrismaService().$transaction([
      categoryInstance.count({
        where: {
          companyId: tennatId,
          deletedAt: null,
        },
      }),
      categoryInstance.findMany({
        take: mappedFilters.perPage,
        skip: Math.round(
          Math.abs(mappedFilters.page - 1) * Number(mappedFilters.perPage),
        ),
        orderBy: {
          [orderBy]: orderType,
        },
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
      }),
    ]);

    const hierarchicalCategories = this.buildHierarchy(results);
    console.log(JSON.stringify(hierarchicalCategories, null, 2));
    return {
      results: hierarchicalCategories,
      pagination: {
        page: mappedFilters.page,
        perPage: mappedFilters.perPage,
        total,
      },
    };
  }

  buildHierarchy(categories, parentId = null) {
    const filteredCategories = categories.filter(
      (category) => category.parentId === parentId,
    );

    const hierarchicalCategories = filteredCategories.map((category) => ({
      id: category.id,
      name: category.name,
      images: category.images.map((image) => image.imageUrl),
      parentId: category.parentId,
      categories: this.buildHierarchy(categories, category.id),
    }));

    return hierarchicalCategories;
  }
}
