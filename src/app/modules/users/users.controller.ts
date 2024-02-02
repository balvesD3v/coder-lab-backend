import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/app/dtos/users/create-user.dto';
import { IsPublic } from 'src/auth/decorators/is-publickey.decorator';
import { CurrentUser } from './decorators/is-currentuser.decorator';
import { UserEntity } from 'src/app/entities/users/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.usersService.create(createUserDTO);
    return {
      user: user,
      message: 'User registered!',
    };
  }

  @Get(':id')
  findById(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    console.log(user);
    return this.usersService.findById(id);
  }
}
