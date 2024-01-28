import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface FindAllParams {
  perPage?: number;
  page?: number;
  orderBy?: string;
  orderType?: 'asc' | 'desc';
  filters?: any;
}

@Injectable()
export class AdminGenericCrud {
  constructor(private readonly instance) {}

  async create<T = any>(body: T) {
    const result = await this.instance.create({
      data: {
        ...body,
      },
    });

    return result;
  }

  async findAll({
    perPage,
    page,
    orderBy = 'updatedAt',
    orderType = 'desc',
    // TODO: Precisa aplicar validação nesse campo, tem risco grande de SQL Injection
    filters = {},
  }: FindAllParams) {
    const mappedFilters = {
      perPage: Number(perPage || 5),
      page: page || 1,
      filters: filters || {},
    };
    const [total, results] = await new PrismaService().$transaction([
      this.instance.count({
        where: {
          ...filters,
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

  async findOne(id: number) {
    const result = await this.instance.findFirstOrThrow({
      where: {
        id,
        deletedAt: null,
      },
    });

    return result;
  }

  async update<T = any>(id: number, body: T) {
    const result = await this.instance.update({
      where: {
        id: id,
        deletedAt: null,
      },
      data: body,
    });

    return result;
  }

  async remove(id: number) {
    const result = await this.instance.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return result;
  }
}
