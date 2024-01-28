import { Injectable } from '@nestjs/common';
import { GenericCrud } from '../../../crud-base/generic-crud-service';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { ProductResponse } from '../dto/productResponse.dto';

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
export class FindAllProductsUseCase extends GenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.product);
  }

  async execute(
    companyExternalId: string,
    {
      perPage,
      page,
      orderBy = 'updatedAt',
      orderType = 'desc',
      filters = {},
    }: FindAllParams,
  ): Promise<any> {
    const mappedFilters = {
      perPage: Number(perPage || 5),
      page: page || 1,
      filters: filters || {},
    };
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);
    const productInstance = this.prismaService.product;

    const [total, results] = await new PrismaService().$transaction([
      productInstance.count({
        where: {
          ...filters,
          companyId: tennatId,
          deletedAt: null,
        },
      }),
      productInstance.findMany({
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
          ...mappedFilters.filters,
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
              name: true,
            },
          },
          productImages: {
            where: {
              isMain: true,
            },
            select: {
              imageUrl: true,
            },
          },
        },
      }),
    ]);

    return {
      results: results.map((result) =>
        new ProductResponse().map(result as any),
      ),
      pagination: {
        page: mappedFilters.page,
        perPage: mappedFilters.perPage,
        total,
      },
    };
  }
}
