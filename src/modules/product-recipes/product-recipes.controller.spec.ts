import { Test, TestingModule } from '@nestjs/testing';
import { ProductRecipesController } from './product-recipes.controller';
import { ProductRecipesService } from './product-recipes.service';

describe('ProductRecipesController', () => {
  let controller: ProductRecipesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductRecipesController],
      providers: [ProductRecipesService],
    }).compile();

    controller = module.get<ProductRecipesController>(ProductRecipesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
