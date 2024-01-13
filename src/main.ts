import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { configSwagger } from './swagger/config/config.service';
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
  const port = process.env.PORT || 3031;
  configSwagger(app);
  await app.listen(port);

  console.log(`Application is running on: ${process.env.API_ENDPOINT}`);

  setGlobalListAppRoutes(app);
}
bootstrap();
