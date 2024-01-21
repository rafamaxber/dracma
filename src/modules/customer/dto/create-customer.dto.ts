import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsEmail,
  IsMobilePhone,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  cnpj?: string;

  @IsEmail()
  @ApiProperty({ required: false })
  @IsOptional()
  email?: string;

  @IsMobilePhone('pt-BR')
  @ApiProperty({ required: false })
  @IsOptional()
  phone?: string;
}
