import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { GenericCrud } from '../../crud-base/generic-crud-service';

interface FindAllParams {
  perPage?: number;
  page?: number;
  orderBy?: string;
  orderType?: 'asc' | 'desc';
  filters?: any;
}

@Injectable()
export class CompanyService extends GenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.company);
  }

  async findAll(
    companyExternalId: string,
    {
      perPage,
      page,
      orderBy = 'updatedAt',
      orderType = 'desc',
      filters = {},
    }: FindAllParams,
  ) {
    const mappedFilters = {
      perPage: Number(perPage || 5),
      page: page || 1,
      filters: filters || {},
    };
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);

    const [total, results] = await new PrismaService().$transaction([
      this.prismaService.company.count({
        where: {
          id: tennatId,
          deletedAt: null,
          ...filters,
        },
      }),
      this.prismaService.company.findMany({
        take: mappedFilters.perPage,
        skip: Math.round(
          Math.abs(mappedFilters.page - 1) * Number(mappedFilters.perPage),
        ),
        orderBy: {
          [orderBy]: orderType,
        },
        where: {
          id: tennatId,
          deletedAt: null,
          ...mappedFilters.filters,
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
