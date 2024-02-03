import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CategoryService } from './app/modules/category/category.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const categoriesService = app.get(CategoryService);
  await categoriesService.addCategoriesToDatabase();

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
