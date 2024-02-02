import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({
    message: 'Campo obrigatório',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'Campo obrigatório',
  })
  @IsString()
  name: string;

  @IsNotEmpty({
    message: 'Campo obrigatório',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 2,
    minUppercase: 1,
  })
  password: string;
}
