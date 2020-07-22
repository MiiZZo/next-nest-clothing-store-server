import {
  Controller,
  Body,
  Post,
  UseGuards,
  Param,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from '@shared/decorators/role.decorator';
import { RoleGuard } from '@shared/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { JoiValidationPipe } from '@shared/pipes/joi-validation.pipe';
import { changeRoleValidationSchema } from './change-role-validation.schema';

class ChangeRoleDto {
  userId: string;
  roleId: string;
}

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @UsePipes(new JoiValidationPipe(changeRoleValidationSchema))
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('superadmin')
  @Post('change-role')
  async changeRole(@Body() { userId, roleId }: ChangeRoleDto) {
    await this.usersService.changeRole(userId, roleId);
  }

  @Post('confirm-email/:token')
  async confirmEmail(@Param('token') token: string) {
    const decodedToken = this.jwtService.decode(token);
    if (typeof decodedToken !== 'string') {
      decodedToken.asdf;
    }
  }
}
