import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoriesEntity } from 'src/app/entities/categories/categories.entity';
import { IsPublic } from 'src/auth/decorators/is-publickey.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @IsPublic()
  @Get()
  getAllCategories(): Promise<CategoriesEntity[]> {
    return this.categoryService.getAllCategories();
  }
}
