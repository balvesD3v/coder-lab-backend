import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from 'src/app/entities/categories/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesEntity: Repository<CategoriesEntity>,
  ) {}
}
