import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from 'src/app/entities/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/app/repositories/users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
