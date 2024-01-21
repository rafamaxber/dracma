import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '@prisma/client';

export class CustomerEntity implements Customer {
  @ApiProperty({ required: false })
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: false })
  cnpj: string | null;

  @ApiProperty({ required: false })
  email: string | null;

  @ApiProperty({ required: false })
  phone: string | null;

  @ApiProperty({ required: true })
  companyId: number;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty({ required: false })
  updatedAt: Date;

  @ApiProperty({ required: false })
  deletedAt: Date | null;
}
