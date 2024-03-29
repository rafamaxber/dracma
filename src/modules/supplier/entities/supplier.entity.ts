import { Supplier } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class SupplierEntity implements Supplier {
  @ApiProperty({ required: false })
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: false })
  cnpj: string;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false })
  phone: string;

  @ApiProperty({ required: true })
  companyId: number;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;

  @ApiProperty({ required: false })
  deletedAt: Date;
}
