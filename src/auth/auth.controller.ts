import { Controller, Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorEntity } from '../app.entity';
import { AuthService } from './auth.service';
import { TokenPairEntity } from './entities/token-pair.entity';
import { LoginDto, RefreshDto } from './dto/login.dto';
import { Public } from './guards/auth.guard';

@ApiTags('auth')
@ApiOkResponse({
  type: TokenPairEntity,
  description: 'Access & refresh token pair.',
})
@ApiUnauthorizedResponse({
  type: ErrorEntity,
  description: 'Invalid refresh token.',
})
@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: LoginDto): Promise<TokenPairEntity> {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refresh(
    @Body() refreshDto: RefreshDto,
  ): Promise<TokenPairEntity> {
    return this.authService.refreshTokens(refreshDto.refreshToken);
  }
}
