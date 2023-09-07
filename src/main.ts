import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { configSwagger } from './swagger/config/config.service';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  configSwagger(app);
  await app.listen(3000);
}
bootstrap();
