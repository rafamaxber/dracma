import { Module } from '@nestjs/common';
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
import { PrismaModule } from './database/prisma/prisma.module';

@Module({
  imports: [
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
  ],
})
export class AppModule {}
