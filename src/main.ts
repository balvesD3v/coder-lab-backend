import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CategoryService } from './app/modules/category/category.service';
import { CategoriesEntity } from './app/entities/categories/categories.entity';

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
  const newCategory = new CategoriesEntity();
  newCategory.name = 'desserts';
  newCategory.name = 'drinks';
  newCategory.name = 'snack';
  await categoriesService.createCategory(newCategory);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
