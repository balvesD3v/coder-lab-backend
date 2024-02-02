import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/app/dtos/users/create-user.dto';
import { UserEntity } from 'src/app/entities/users/user.entity';
import { UserRepository } from 'src/app/repositories/users/users.repository';
import { ServiceContract } from 'src/app/contract/service.contract';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService
  implements ServiceContract<UserEntity, CreateUserDTO>
{
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDTO): Promise<UserEntity> {
    const checkUserExists = await this.userRepository.findEmail(dto.email);

    if (checkUserExists) {
      throw new HttpException('Usuário já existe', HttpStatus.FORBIDDEN);
    }

    dto.password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.createUser(dto);

    return user;
  }
}
