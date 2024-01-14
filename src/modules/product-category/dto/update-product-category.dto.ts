import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-product-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
