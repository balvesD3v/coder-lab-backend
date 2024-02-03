import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoriesEntity } from 'src/app/entities/categories/categories.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories(): Promise<CategoriesEntity[]> {
    return this.categoryService.getAllCategories();
  }
}
