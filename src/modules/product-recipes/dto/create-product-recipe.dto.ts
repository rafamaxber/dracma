import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRecipeDto {
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
  companyId: number | null;
}
