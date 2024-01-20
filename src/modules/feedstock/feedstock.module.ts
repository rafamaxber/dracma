import { Module } from '@nestjs/common';
import { FeedstockService } from './feedstock.service';
import { FeedstockController } from './feedstock.controller';

@Module({
  controllers: [FeedstockController],
  providers: [FeedstockService],
})
export class FeedstockModule {}
