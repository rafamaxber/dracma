import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CreateMyCompanyUsecase } from './use-cases/create-my-company';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CreateMyCompanyUsecase],
})
export class CompanyModule {}
