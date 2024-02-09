import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../dtos/products/create-product.dto';
import { UpdateProductDto } from '../../dtos/products/update-product.dto';
import { ProductRepository } from 'src/app/repositories/products/products.repository';
import { CategoriesEntity } from 'src/app/entities/categories/categories.entity';
import { ImagesService } from '../images/images.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly imageService: ImagesService,
  ) {}

  async create({
    file,
    ...dto
  }: CreateProductDto & { file: Express.Multer.File }) {
    const checkProductExists = await this.productRepository.findProduct(
      dto.name,
    );

    if (checkProductExists) {
      throw new HttpException('Product already exists!', HttpStatus.CONFLICT);
    }

    const category = await this.findCategoryById(dto.categoryId);

    if (!category)
      throw new HttpException('Category not found!', HttpStatus.NOT_FOUND);

    const photo = await this.imageService.upload('product/images', file);

    const product = await this.productRepository.createProduct(
      { ...dto, photo },
      category,
    );
    return product;
  }

  async update(
    id: string,
    {
      file,
      ...updateProductDto
    }: UpdateProductDto & { file?: Express.Multer.File },
  ) {
    await this.findOne(id);

    let photo;

    if (file && file.size !== 0) {
      photo = await this.imageService.upload('product/images', file);
    }
    const product = await this.productRepository.updateProduct(id, {
      ...updateProductDto,
      photo,
    });
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
}
