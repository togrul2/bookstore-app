import { Request, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './auth.dto';
import { TokenPairEntity } from './auth.entity';
import { ErrorDto } from '../app.dto';
// import { JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard } from './auth.guard';
import { Request as Req } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({
    type: TokenPairEntity,
    description: 'Access & refresh token pair.',
  })
  @ApiUnauthorizedResponse({
    type: ErrorDto,
    description: 'Invalid credentials.',
  })
  public async login(@Body() credentials: LoginDto): Promise<TokenPairEntity> {
    return await this.authService.loginJwt(credentials);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('local'))
  public async refresh(@Request() req: Req) {
    return req.user;
  }
}
