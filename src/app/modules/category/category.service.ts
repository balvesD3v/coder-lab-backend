import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from 'src/app/entities/categories/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}

  async addCategoriesToDatabase() {
    const categoriesToAdd = [
      { name: 'snacks' },
      { name: 'Drinks' },
      { name: 'Desserts' },
    ];

    for (const categoryData of categoriesToAdd) {
      const existingCategory = await this.categoriesRepository.findOne({
        where: { name: categoryData.name },
      });

      if (!existingCategory) {
        const category = this.categoriesRepository.create(categoryData);
        await this.categoriesRepository.save(category);
      }
    }
  }

  async getAllCategories(): Promise<CategoriesEntity[]> {
    return this.categoriesRepository.find();
  }
}
