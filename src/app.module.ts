import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

import { HealthModule } from './health/health.module';
import { PrismaModule } from './database/prisma/prisma.module';

import { PlansModule } from './modules/plans/plans.module';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { ClientModule } from './modules/customer/customer.module';
import { BankModule } from './modules/bank/bank.module';
import { CategoryModule } from './modules/category/category.module';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { BudgetModule } from './modules/budget/budget.module';
import { ProjectModule } from './modules/project/project.module';
import { DocumentModule } from './modules/document/document.module';
import { AccountModule } from './modules/account/account.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { AuthModule } from './modules/user-auth/auth.module';
import { AuthGuard } from './modules/user-auth/auth.guard';
import { ProductModule } from './modules/product/product.module';

import { EmailModule } from './email/email-module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { UnitsModule } from './modules/units/units.module';
import { FeedstockModule } from './modules/feedstock/feedstock.module';
import { ProductRecipesModule } from './modules/product-recipes/product-recipes.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
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
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
    HttpModule,
    EmailModule,
    AuthModule,
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
    ProductCategoryModule,
    PrismaModule,
    HealthModule,
    ProductModule,
    UnitsModule,
    FeedstockModule,
    ProductRecipesModule,
    OrdersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
