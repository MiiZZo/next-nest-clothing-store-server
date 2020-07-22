import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { User, userSchema } from './schemas/users.schema';
import { Role, roleSchema } from './schemas/roles.schema';
import { UsersController } from './users.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: config.get('JWT_SECRET'),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: Role.name, schema: roleSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
