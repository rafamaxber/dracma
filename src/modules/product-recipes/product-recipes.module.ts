import { Module } from '@nestjs/common';
import { ProductRecipesService } from './product-recipes.service';
import { ProductRecipesController } from './product-recipes.controller';

@Module({
  controllers: [ProductRecipesController],
  providers: [ProductRecipesService],
})
export class ProductRecipesModule {}
