import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  price: number;

  photo: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
