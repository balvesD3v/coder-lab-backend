import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../dtos/products/create-product.dto';
import { UpdateProductDto } from '../../dtos/products/update-product.dto';
import { ProductRepository } from 'src/app/repositories/products/products.repository';
import { CategoriesEntity } from 'src/app/entities/categories/categories.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(dto: CreateProductDto) {
    const checkProductExists = await this.productRepository.findProduct(
      dto.name,
    );

    if (checkProductExists) {
      throw new HttpException('Product already exists!', HttpStatus.CONFLICT);
    }

    const category = await this.findCategoryById(dto.categoryName);

    if (!category)
      throw new HttpException('Category not found!', HttpStatus.NOT_FOUND);

    const product = await this.productRepository.createProduct(dto, category);
    return product;
  }

  async findCategoryById(id: string): Promise<CategoriesEntity | undefined> {
    return await CategoriesEntity.findOne({ where: { id } });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findProductById(id);

    if (!product) {
      throw new HttpException('Product not exists!', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async findAll() {
    const checkProductExists =
      await this.productRepository.findProductAllProducts();

    if (!checkProductExists) {
      throw new HttpException('Product not exists!', HttpStatus.NOT_FOUND);
    }

    return checkProductExists;
  }

  async remove(id: string) {
    await this.findOne(id);

    const product = await this.productRepository.removeProduct(id);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    const product = await this.productRepository.updateProduct(
      id,
      updateProductDto,
    );
    return product;
  }
}
