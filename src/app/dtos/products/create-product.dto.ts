import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  photo: string;

  @IsUUID()
  @IsNotEmpty()
  categoryName: string;
}
