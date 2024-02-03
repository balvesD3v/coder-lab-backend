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
      { name: 'Categoria 1' },
      { name: 'Categoria 2' },
      { name: 'Categoria 3' },
    ];

    for (const categoryData of categoriesToAdd) {
      const category = this.categoriesRepository.create(categoryData);
      await this.categoriesRepository.save(category);
    }
  }

  async getAllCategories(): Promise<CategoriesEntity[]> {
    return this.categoriesRepository.find();
  }

  async createCategory(category: CategoriesEntity): Promise<CategoriesEntity> {
    return this.categoriesRepository.save(category);
  }
}
