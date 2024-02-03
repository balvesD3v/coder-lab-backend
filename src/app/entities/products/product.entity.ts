import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoriesEntity } from '../categories/categories.entity';

@Entity({ name: 'products' })
export class ProductsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CategoriesEntity, { eager: true })
  category: CategoriesEntity;

  @Column()
  name: string;

  @Column()
  qty: number;

  @Column({ type: 'float' })
  price: number;

  @Column()
  photo: string;
}
