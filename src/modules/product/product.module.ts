import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CreateProductUseCase } from './use-cases/create-product';

@Module({
  controllers: [ProductController],
  providers: [ProductService, CreateProductUseCase],
})
export class ProductModule {}
