import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { TokenPairEntity } from './auth.entity';
import { LoginDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Return user with given username and matching password.
   * @param username User's username.
   * @param password User's password.
   */
  public async validateUser(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userRepository.getUserByUsername(username);

    if (user && (await compare(password, user.password))) return user;

    return null;
  }

  /**
   * Generate access and refresh token pair for given user.
   * @param credentials User's credentials payload.
   */
  public async loginJwt(credentials: LoginDto): Promise<TokenPairEntity> {
    const user = await this.validateUser(
      credentials.username,
      credentials.password,
    );
    const isPasswordMatching = await compare(
      credentials.password,
      user?.password || '',
    );

    if (!user || !isPasswordMatching)
      throw new UnauthorizedException('Invalid credentials!');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.generateTokenPair(user._id, user.username);
  }

  /**
   * Generate access and refresh token pair for given user.
   * @param id User's id.
   * @param username User's username.
   * @private
   */
  private async generateTokenPair(
    id: string,
    username: string,
  ): Promise<TokenPairEntity> {
    const jwtPayload = { id, username };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_SECRET_ACCESS_KEY'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_TTL'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_TTL'),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
