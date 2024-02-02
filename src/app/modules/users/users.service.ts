import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/app/dtos/users/create-user.dto';
import { UserEntity } from 'src/app/entities/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async createUser(createUserDTO: CreateUserDTO) {
    const checkUserExists = await this.userRepository.findOne({
      where: {
        email: createUserDTO.email,
      },
    });
    if (checkUserExists) {
      throw new HttpException('Usuário já existe', HttpStatus.FORBIDDEN);
    }
    const user = await this.userRepository.save({
      ...createUserDTO,
      role: 'admin',
      salt: '',
    });
    console.log(user);

    return user;
  }
}
