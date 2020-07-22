import {
  Controller,
  Post,
  Req,
  UseGuards,
  Body,
  UsePipes,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from '@shared/pipes/joi-validation.pipe';
import { userSchema } from './register-validation.schema';
import { CreateUserDto } from '@shared/dto/user.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new JoiValidationPipe(userSchema))
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    await this.authService.register(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const tokens = await this.authService.login(req.user);
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    res.json({
      access_token: tokens.access_token,
    });
  }
}
