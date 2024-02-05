import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from 'src/app/repositories/products/products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/app/entities/products/product.entity';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity]), ImagesModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
