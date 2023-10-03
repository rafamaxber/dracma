import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as packageJson from '../../../../package.json';

export function configSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Dracma API')
    .setDescription('The Dracma API description')
    .setVersion(packageJson.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
