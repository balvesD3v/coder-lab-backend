import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({
    message: 'Required Field',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'Required Field',
  })
  @IsString()
  name: string;

  @MinLength(4)
  @MaxLength(20)
  password: string;
}
