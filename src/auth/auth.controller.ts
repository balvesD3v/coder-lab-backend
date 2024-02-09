import { Body, Post, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDTO } from 'src/app/dtos/auth/auth.dto';
import { IsPublic } from './decorators/is-publickey.decorator';

@Controller('session')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post()
  signIn(@Body() signInDto: CreateAuthDTO) {
    return this.authService.signIn(signInDto);
  }
}
