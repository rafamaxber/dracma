import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class FilterQueryDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name?: string;
}
