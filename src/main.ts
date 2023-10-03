import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { configSwagger } from './infra/swagger/config/config.service';
import { setGlobalListAppRoutes } from './global-list-app-routes/setGlobalListAppRoutes';
import { VersioningType } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.enableCors();
  app.use(helmet());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  configSwagger(app);
  await app.listen(3000);

  setGlobalListAppRoutes(app);
}
bootstrap();
