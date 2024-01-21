import { ApiProperty } from '@nestjs/swagger';
import { ProductRecipe } from '@prisma/client';

export class ProductRecipeEntity implements ProductRecipe {
  @ApiProperty()
  id: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  feedstockId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  unitId: number | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  companyId: number | null;
}
