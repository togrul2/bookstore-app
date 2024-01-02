import { Controller, Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorDto } from '../app.dto';
import { AuthService } from './auth.service';
import { TokenPairEntity } from './auth.entity';
import { LoginDto, RefreshDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TokenPairEntity,
    description: 'Access & refresh token pair.',
  })
  @ApiUnauthorizedResponse({
    type: ErrorDto,
    description: 'Invalid credentials.',
  })
  public async login(@Body() loginDto: LoginDto): Promise<TokenPairEntity> {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TokenPairEntity,
    description: 'Access & refresh token pair.',
  })
  @ApiUnauthorizedResponse({
    type: ErrorDto,
    description: 'Invalid refresh token.',
  })
  public async refresh(
    @Body() refreshDto: RefreshDto,
  ): Promise<TokenPairEntity> {
    return this.authService.refreshTokens(refreshDto.refreshToken);
  }
}
