import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    Logger.log('Connecting to the database...', 'PrismaService');
    await this.$connect();
  }

  async onModuleDestroy() {
    Logger.log('Disconnecting from the database...', 'PrismaService');
    await this.$disconnect();
  }
}
