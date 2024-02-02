import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDTO } from 'src/app/dtos/auth/auth.dto';
import { UsersService } from 'src/app/modules/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signIn(dto: CreateAuthDTO): Promise<{ token: string }> {
    const checkEmailExists = await this.userService.findByEmail(dto.email);
    const passwordIsValid = await bcrypt.compare(
      dto.password,
      checkEmailExists.password,
    );

    if (!passwordIsValid) {
      throw new HttpException("Password don't match", HttpStatus.UNAUTHORIZED);
    }

    const token = this.jwtService.sign({
      subject: checkEmailExists.id,
    });

    return { token };
  }
}
