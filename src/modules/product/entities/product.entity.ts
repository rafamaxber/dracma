import { Product, ProductStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  categories: number[];

  @ApiProperty({ required: false, nullable: true })
  images: string[];

  @ApiProperty()
  code: string | null;

  @ApiProperty()
  canBeResold: boolean | null;

  @ApiProperty()
  price_sell: number | null;

  @ApiProperty()
  price_cost: number | null;

  @ApiProperty()
  manufacturer: boolean | null;

  @ApiProperty()
  barcode: string | null;

  @ApiProperty()
  status: ProductStatus | null;

  @ApiProperty()
  quantity: number | null;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  weight: number | null;

  @ApiProperty()
  unit: string | null;

  @ApiProperty()
  stock: boolean | null;

  @ApiProperty()
  stock_min: number | null;

  @ApiProperty()
  stock_max: number | null;

  @ApiProperty()
  removeFeedstockFromStock: boolean | null;

  @ApiProperty()
  companyId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, nullable: true })
  deletedAt: Date | null;

  @ApiProperty()
  unitId: number | null;

  @ApiProperty()
  supplierId: number | null;

  @ApiProperty()
  productCategoryId: number | null;
}
