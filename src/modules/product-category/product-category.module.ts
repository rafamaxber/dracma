import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { CreateCategoryProductUseCase } from './use-cases/create-category-product';
import { FindAllCategoryProductsUseCase } from './use-cases/find-all-category-product';
import { FindCategoryProductsUseCase } from './use-cases/find-category-product';
import { UpdateCategoryProductUseCase } from './use-cases/update-category-product';

@Module({
  controllers: [ProductCategoryController],
  providers: [
    ProductCategoryService,
    CreateCategoryProductUseCase,
    FindAllCategoryProductsUseCase,
    FindCategoryProductsUseCase,
    UpdateCategoryProductUseCase,
  ],
})
export class ProductCategoryModule {}
