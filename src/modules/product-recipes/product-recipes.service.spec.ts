import { Test, TestingModule } from '@nestjs/testing';
import { ProductRecipesService } from './product-recipes.service';

describe('ProductRecipesService', () => {
  let service: ProductRecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductRecipesService],
    }).compile();

    service = module.get<ProductRecipesService>(ProductRecipesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
