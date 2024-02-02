import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/app/dtos/users/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findUsers() {
    const users = await this.usersService.findUsers();
    return users;
  }

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.usersService.createUser(createUserDTO);
    return {
      user: user,
      message: 'Usuário cadastrado!',
    };
  }
}
