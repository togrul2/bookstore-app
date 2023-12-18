import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './auth.dto';
import { TokenPairEntity } from './auth.entity';
import { ErrorDto } from '../app.dto';

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
}
