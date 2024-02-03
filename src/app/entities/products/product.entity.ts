import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoriesEntity } from '../categories/categories.entity';

@Entity({ name: 'products' })
export class ProductsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => CategoriesEntity)
  @JoinTable()
  categories: CategoriesEntity[];

  @Column()
  name: string;

  @Column()
  qty: number;

  @Column({ type: 'float' })
  price: number;

  @Column()
  photo: string;
}
