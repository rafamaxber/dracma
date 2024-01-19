import { ProductCategory } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProductCategoryEntity implements ProductCategory {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  companyId: number;

  @ApiProperty({ required: false, nullable: true })
  deletedAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
