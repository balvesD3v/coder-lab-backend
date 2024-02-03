import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from 'src/app/entities/categories/categories.entity';
import { CategoriesRepository } from 'src/app/repositories/categories/categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoriesRepository],
  exports: [TypeOrmModule],
})
export class CategoryModule {}
