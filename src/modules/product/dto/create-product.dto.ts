import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@prisma/client';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  categories?: number[];

  @IsNumber()
  @IsOptional()
  supplierId?: number;

  @ApiProperty()
  @IsOptional()
  images?: Array<{
    url: string;
    main: boolean;
  }>;

  @IsOptional()
  code?: string;

  @IsBoolean()
  @IsOptional()
  canBeResold?: boolean;

  @IsNumber()
  @IsOptional()
  price_sell?: number;

  @IsNumber()
  @IsOptional()
  price_cost?: number;

  @IsBoolean()
  @IsOptional()
  manufacturer?: boolean;

  @IsOptional()
  barcode?: string;

  @IsOptional()
  status?: ProductStatus;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsBoolean()
  @IsOptional()
  stock?: boolean;

  @IsString()
  @IsOptional()
  color?: boolean;

  @IsNumber()
  @IsOptional()
  stock_min?: number;

  @IsNumber()
  @IsOptional()
  stock_max?: number;

  @IsBoolean()
  @IsOptional()
  removeFeedstockFromStock?: boolean;

  @IsNumber()
  @IsOptional()
  unitId?: number;

  @IsNumber()
  @IsOptional()
  productCategoryId?: number;
}
