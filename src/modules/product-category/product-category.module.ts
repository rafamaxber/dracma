import { Module } from '@nestjs/common';
import { CategoryService } from './product-category.service';
import { CategoryController } from './product-category.controller';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
