import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import {
  FindAllParams,
  GenericCrud,
} from '../../crud-base/generic-crud-service';

@Injectable()
export class FeedstockService extends GenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.productFeedstock);
  }

  async findAll(
    companyExternalId: string,
    {
      perPage,
      page,
      orderBy = 'updatedAt',
      orderType = 'desc',
      // TODO: Precisa aplicar validação nesse campo, tem risco grande de SQL Injection
      filters = {},
    }: FindAllParams,
  ) {
    const instance = this.prismaService.productFeedstock;

    const mappedFilters = {
      perPage: Number(perPage || 5),
      page: page || 1,
      filters: filters || {},
    };
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);

    const [total, results] = await new PrismaService().$transaction([
      instance.count({
        where: {
          ...filters,
          companyId: tennatId,
          deletedAt: null,
        },
      }),
      instance.findMany({
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
        },
      }),
    ]);

    return {
      results,
      pagination: {
        page: mappedFilters.page,
        perPage: mappedFilters.perPage,
        total,
      },
    };
  }
}
