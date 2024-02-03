import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/app/dtos/users/create-user.dto';
import { UserEntity } from 'src/app/entities/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  findEmail(email: string): Promise<UserEntity | null> {
    return this.userEntity.findOne({
      where: {
        email,
      },
    });
  }

  findById(id: string): Promise<UserEntity> {
    return this.userEntity.findOne({
      where: { id },
    });
  }

  createUser(dto: CreateUserDTO): Promise<UserEntity> {
    return this.userEntity.save({
      ...dto,
      role: 'admin',
    });
  }
}
