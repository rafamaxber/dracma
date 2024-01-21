import { ApiProperty } from '@nestjs/swagger';
import { Order, Status } from '@prisma/client';

export class OrderEntity implements Order {
  @ApiProperty()
  id: number;

  @ApiProperty()
  idExternal: string;

  @ApiProperty()
  status: Status;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  customerId: number;

  @ApiProperty()
  sendInvoice: boolean;

  @ApiProperty()
  companyId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
