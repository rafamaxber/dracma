import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CreateProductUseCase } from './use-cases/create-product';
import { FindAllProductsUseCase } from './use-cases/find-all-product';
import { UpdateProductUseCase } from './use-cases/update-product';
import { FindProductUseCase } from './use-cases/find-product';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    CreateProductUseCase,
    FindAllProductsUseCase,
    UpdateProductUseCase,
    FindProductUseCase,
  ],
})
export class ProductModule {}
