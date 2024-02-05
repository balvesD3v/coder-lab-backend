import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/app/dtos/products/create-product.dto';
import { UpdateProductDto } from 'src/app/dtos/products/update-product.dto';
import { CategoriesEntity } from 'src/app/entities/categories/categories.entity';
import { ProductsEntity } from 'src/app/entities/products/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsEntity: Repository<ProductsEntity>,
  ) {}

  findProduct(name: string): Promise<ProductsEntity | null> {
    return this.productsEntity.findOne({
      where: {
        name,
      },
    });
  }

  findProductAllProducts(): Promise<ProductsEntity[] | null> {
    return this.productsEntity.find();
  }

  findProductById(id: string): Promise<ProductsEntity> {
    return this.productsEntity.findOne({
      where: { id },
    });
  }

  removeProduct(id: string) {
    return this.productsEntity.delete({ id: id });
  }

  createProduct(
    dto: CreateProductDto & { photo: string },
    category: CategoriesEntity,
  ): Promise<ProductsEntity> {
    return this.productsEntity.save({
      ...dto,
      category: category,
    });
  }

  updateProduct(
    id: string,
    dto: UpdateProductDto & { photo?: string },
  ): Promise<ProductsEntity> {
    return this.productsEntity.save({ id, ...dto });
  }
}
