import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async findByEmail(email: string) {
    const user = await this.userRepository.findEmail(email);

    if (!user) {
      throw new HttpException('User not exists!', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpException('User not exists!', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(dto: CreateUserDTO): Promise<UserEntity> {
    const checkUserExists = await this.userRepository.findEmail(dto.email);

    if (checkUserExists) {
      throw new HttpException('User already exists!', HttpStatus.CONFLICT);
    }

    dto.password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.createUser(dto);

    return user;
  }
}
