import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('healthhabits');

  const config = new DocumentBuilder()
    .setTitle('Healthhabits')
    .setDescription('Documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/healthhabits/api/docs', app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 4000, () => console.log(`Server started on port ${process.env.PORT}`));
}
bootstrap();
