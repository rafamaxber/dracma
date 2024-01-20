import { Test, TestingModule } from '@nestjs/testing';
import { FeedstockService } from './feedstock.service';

describe('FeedstockService', () => {
  let service: FeedstockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedstockService],
    }).compile();

    service = module.get<FeedstockService>(FeedstockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
