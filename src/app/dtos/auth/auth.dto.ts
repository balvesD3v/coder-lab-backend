import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}
