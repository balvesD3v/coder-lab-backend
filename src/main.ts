import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriesEntity } from './app/entities/categories/categories.entity';
import { Connection } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const connection = app.get(Connection);
  const categoryRepository = app.get(getRepositoryToken(CategoriesEntity));
  const existingCategories = await categoryRepository.count();
  if (existingCategories === 0) {
    const categoriesToAdd = [
      { name: 'Categoria 1' },
      { name: 'Categoria 2' },
      { name: 'Categoria 3' },
    ];

    for (const categoryData of categoriesToAdd) {
      const category = categoryRepository.create(categoryData);
      await categoryRepository.save(category);
    }
  }

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
