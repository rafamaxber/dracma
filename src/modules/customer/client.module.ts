import { Module } from '@nestjs/common';
import { CustomerService } from './client.service';
import { ClientController } from './client.controller';

@Module({
  controllers: [ClientController],
  providers: [CustomerService],
})
export class ClientModule {}
