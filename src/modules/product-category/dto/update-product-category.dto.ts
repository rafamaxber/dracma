import { PartialType } from '@nestjs/swagger';
import { CreateProductCategoryDto as CreateProductCategoryDto } from './create-product-category.dto';

export class UpdateProductCategoryDto extends PartialType(
  CreateProductCategoryDto,
) {}
