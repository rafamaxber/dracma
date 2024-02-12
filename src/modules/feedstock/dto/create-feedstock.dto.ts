import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateFeedstockDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty()
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isFeedstock: boolean;

  @IsNumber()
  @ApiProperty()
  unitId: number | null;

  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @ApiProperty()
  stockQuantity: number;

  @IsNumber()
  @ApiProperty()
  supplierId: number;

  @IsNumber()
  @ApiProperty()
  price: number;
}
