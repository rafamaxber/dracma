import { Test, TestingModule } from '@nestjs/testing';
import { FeedstockController } from './feedstock.controller';
import { FeedstockService } from './feedstock.service';

describe('FeedstockController', () => {
  let controller: FeedstockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedstockController],
      providers: [FeedstockService],
    }).compile();

    controller = module.get<FeedstockController>(FeedstockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
