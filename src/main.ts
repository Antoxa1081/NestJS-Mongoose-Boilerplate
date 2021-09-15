import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(
    new SanitizeMongooseModelInterceptor({
      excludeMongooseId: false,
      excludeMongooseV: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Backend broker')
    .setDescription('The broker API')
    .setVersion('1.0')
    // .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
