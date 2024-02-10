import { ProductFeedstock } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FeedstockEntity implements ProductFeedstock {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  unitId: number | null;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  stockQuantity: number;

  @ApiProperty()
  isFeedstock: boolean;

  @ApiProperty({ required: false })
  supplierId: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  companyId: number;

  @ApiProperty()
  deletedAt: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
