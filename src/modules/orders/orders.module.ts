import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { CreateOrderUseCase } from './user-cases/create-order';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, CreateOrderUseCase],
})
export class OrdersModule {}
