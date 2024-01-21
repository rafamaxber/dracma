import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  status: Status;

  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsNumber()
  @ApiProperty()
  customerId: number;

  @IsBoolean()
  @ApiProperty()
  sendInvoice: boolean;

  @IsArray()
  @ApiProperty()
  orderItems: OrderItemsDto[];
}

export class OrderItemsDto {
  @IsNumber()
  @ApiProperty()
  productId: number;

  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  discount: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  note: string | null;
}
