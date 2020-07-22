import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as config from 'config';
import { UsersService } from '../users/users.service';
import { UserDto, CreateUserDto } from '@shared/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(user: CreateUserDto): Promise<void> {
    const userWithMatchEmail = await this.usersService.findOne(user.email);

    if (userWithMatchEmail !== null) {
      throw new UnauthorizedException(
        'User with this email already registered',
      );
    }

    const hashPassword = bcrypt.hashSync(user.password);

    await this.usersService.createUser({ ...user, password: hashPassword });
  }

  async login(user: any) {
    const payload = { sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: config.get('JWT_SECRET'),
        expiresIn: config.get('ACCESS_TOKEN_LIFETIME'),
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: config.get('JWT_SECRET'),
        expiresIn: config.get('REFRESH_TOKEN_LIFETIME'),
      }),
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<UserDto, 'password' | '_id'> | null> {
    const user = await this.usersService.findOne(email);
    if (user !== null) {
      const matchPassword = bcrypt.compareSync(password, user.password);
      if (matchPassword) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
}
