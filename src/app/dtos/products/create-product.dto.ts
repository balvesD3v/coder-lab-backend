import { IsNotEmpty, IsUUID } from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  price: number;

  photo?: string | undefined;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
