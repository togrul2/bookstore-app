import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Passport } from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { JwtPayload, JwtRefreshPayload } from './auth.type';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Passport, 'jwt') {
  public constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_ACCESS_KEY'),
    });
  }

  public async validate(payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }
}

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Passport,
  'refresh-jwt',
) {
  public constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: configService.get<string>('JWT_SECRET_REFRESH_KEY'),
    });
  }

  public async validate(
    request: Request,
    payload: JwtPayload,
  ): Promise<JwtRefreshPayload> {
    const refreshToken = request
      ?.get('Authorization')
      ?.replace('Bearer ', '')
      ?.trim();

    if (!refreshToken)
      throw new UnauthorizedException('Missing or invalid refresh token!');

    return { ...payload, refreshToken };
  }
}
