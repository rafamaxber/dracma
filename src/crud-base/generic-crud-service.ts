import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

interface FindAllParams {
  perPage?: number;
  page?: number;
  orderBy?: string;
  orderType?: 'asc' | 'desc';
  filters?: any;
}

@Injectable()
export class GenericCrud {
  @Inject(CACHE_MANAGER) private cacheManager: Cache;

  constructor(private readonly instance) {}

  async create<T = any>(companyExternalId: string, body: T) {
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);

    const result = await this.instance.create({
      data: {
        ...body,
        companyId: tennatId,
      },
    });

    return result;
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
    const mappedFilters = {
      perPage: Number(perPage || 5),
      page: page || 1,
      filters: filters || {},
    };
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);

    const [total, results] = await new PrismaService().$transaction([
      this.instance.count({
        where: {
          ...filters,
          companyId: tennatId,
          deletedAt: null,
        },
      }),
      this.instance.findMany({
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

  async findOne(companyExternalId: string, id: number) {
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);

    const result = await this.instance.findFirstOrThrow({
      where: {
        companyId: tennatId,
        id: id,
        deletedAt: null,
      },
    });

    return result;
  }

  async update<T = any>(companyExternalId, id: number, body: T) {
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);

    const result = await this.instance.update({
      where: {
        companyId: tennatId,
        id: id,
        deletedAt: null,
      },
      data: body,
    });

    return result;
  }

  async remove(companyExternalId: string, id: number) {
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);

    const result = await this.instance.update({
      where: {
        companyId: tennatId,
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return result;
  }

  async findTenantIdByCompanyId(companyExternalId: string): Promise<number> {
    const cachedTenantId = await this.cacheManager.get(companyExternalId);
    if (cachedTenantId) {
      Logger.debug('GenericCrud::GET cached tenant id');
      return Number(cachedTenantId);
    }

    const { id } = await new PrismaService().company.findFirstOrThrow({
      where: {
        idExternal: companyExternalId,
      },
      select: {
        id: true,
      },
    });
    const ttl = 1000 * 60 * 60; // 1 hour
    Logger.debug('GenericCrud::SET cached tenant id');
    this.cacheManager.set(companyExternalId, id, ttl);

    return id;
  }
}
