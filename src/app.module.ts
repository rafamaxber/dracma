import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { HealthModule } from './infra/health/health.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';

import { PlansModule } from './modules/plans/plans.module';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { ClientModule } from './modules/client/client.module';
import { BankModule } from './modules/bank/bank.module';
import { CategoryModule } from './modules/category/category.module';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { BudgetModule } from './modules/budget/budget.module';
import { ProjectModule } from './modules/project/project.module';
import { DocumentModule } from './modules/document/document.module';
import { AccountModule } from './modules/account/account.module';
import { TransferModule } from './modules/transfer/transfer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    PlansModule,
    CompanyModule,
    UserModule,
    SupplierModule,
    ClientModule,
    BankModule,
    CategoryModule,
    SubcategoryModule,
    BudgetModule,
    ProjectModule,
    DocumentModule,
    AccountModule,
    TransferModule,
    PrismaModule,
    HealthModule,
  ],
})
export class AppModule {}
