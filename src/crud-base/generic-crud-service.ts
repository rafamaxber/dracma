import { Injectable } from '@nestjs/common';

@Injectable()
export class GenericCrud {
  constructor(private readonly instance) {}

  async create(body) {
    const result = await this.instance.create({
      data: body,
    });

    return result;
  }

  async findAll() {
    const result = await this.instance.findMany({
      where: {
        deletedAt: null,
      },
    });
    return result;
  }

  async findOne(id: number) {
    const result = await this.instance.findUnique({
      where: {
        id: id,
        AND: {
          deletedAt: null,
        },
      },
    });
    return result;
  }

  async update(id: number, body) {
    const result = await this.instance.update({
      where: {
        id: id,
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
