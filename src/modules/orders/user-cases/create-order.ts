import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { GenericCrud } from '../../../crud-base/generic-crud-service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class CreateOrderUseCase extends GenericCrud {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.order);
  }

  async execute(companyExternalId: string, body: CreateOrderDto) {
    const tennatId = await this.findTenantIdByCompanyId(companyExternalId);
    const { orderItems, ...orderData } = body;

    const order = await this.prismaService.order.create({
      data: {
        ...orderData,
        orderItems: {
          create: orderItems,
        },
        companyId: tennatId,
      },
      select: {
        id: true,
        status: true,
        userId: true,
        customerId: true,
        sendInvoice: true,
        orderItems: true,
      },
    });

    return order;
  }
}
