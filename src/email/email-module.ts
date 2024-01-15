import { Global, Module } from '@nestjs/common';
import { SendEmailService } from './send-email';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  exports: [SendEmailService],
  providers: [SendEmailService],
})
export class EmailModule {}
