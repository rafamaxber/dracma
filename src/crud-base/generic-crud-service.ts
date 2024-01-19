import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface FindAllParams {
  perPage?: number;
  page?: number;
  orderBy?: string;
  orderType?: 'asc' | 'desc';
  filters?: any;
}

@Injectable()
export class GenericCrud {
  constructor(private readonly instance) {}

  async create<T = any>(tenantId: string, body: T) {
    const company = await new PrismaService().company.findFirstOrThrow({
      where: {
        idExternal: tenantId,
      },
      select: {
        id: true,
      },
    });

    const result = await this.instance.create({
      data: {
        companyId: company.id,
        ...body,
      },
    });

    return result;
  }

  async findAll(
    tenantId: string,
    {
      perPage = 5,
      page = 1,
      orderBy = 'updatedAt',
      orderType = 'desc',
      filters = {},
    }: FindAllParams,
  ) {
    const { id: companyId } =
      await new PrismaService().company.findFirstOrThrow({
        where: {
          idExternal: tenantId,
        },
        select: {
          id: true,
        },
      });

    const [total, results] = await new PrismaService().$transaction([
      this.instance.count({
        where: {
          companyId,
          AND: {
            deletedAt: null,
            ...filters,
          },
        },
      }),
      this.instance.findMany({
        take: Number(perPage),
        skip: Math.round(Math.abs(page - 1) * Number(perPage)),
        orderBy: {
          [orderBy]: orderType,
        },
        where: {
          companyId,
          AND: {
            deletedAt: null,
            ...filters,
          },
        },
      }),
    ]);

    return {
      results,
      pagination: {
        page,
        perPage,
        total,
      },
    };
  }

  async findOne(tenantId: string, id: number) {
    const { id: companyId } =
      await new PrismaService().company.findFirstOrThrow({
        where: {
          idExternal: tenantId,
          AND: {
            deletedAt: null,
          },
        },
        select: {
          id: true,
        },
      });

    const result = await this.instance.findFirstOrThrow({
      where: {
        companyId,
        AND: {
          id: id,
          deletedAt: null,
        },
      },
    });

    return result;
  }

  async update(tenantId, id: number, body) {
    const { id: companyId } =
      await new PrismaService().company.findFirstOrThrow({
        where: {
          idExternal: tenantId,
          AND: {
            deletedAt: null,
          },
        },
        select: {
          id: true,
        },
      });

    const result = await this.instance.update({
      where: {
        companyId,
        AND: {
          id: id,
          deletedAt: null,
        },
      },
      data: body,
    });

    return result;
  }

  async remove(tenantId, id: number) {
    const { id: companyId } =
      await new PrismaService().company.findFirstOrThrow({
        where: {
          idExternal: tenantId,
          AND: {
            deletedAt: null,
          },
        },
        select: {
          id: true,
        },
      });
    const result = await this.instance.update({
      where: {
        companyId,
        AND: {
          id: id,
        },
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return result;
  }
}
