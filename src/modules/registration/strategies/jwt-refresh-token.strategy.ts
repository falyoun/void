import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtPayload } from '../payloads/jwt.payload';
import { UsersService } from '@app/modules/users/services/users.service';
import { TokensService } from '../services/tokens.service';
import {
  IAppConfig,
  IAuthentication,
} from '@app/app-config/app-config.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token', /// jwtRefresh
) {
  private tokenType = 'refreshToken';

  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService<IAppConfig>,
    private readonly tokenService: TokensService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromBodyField('refreshToken'),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey:
        configService.get<IAuthentication>('authentication').publicKey,
      issuer: configService.get<IAuthentication>('authentication').issuer,
      algorithms: ['RS256'],
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtPayload) {
    const { id, expiration } = payload;
    const now = Math.floor(new Date().getTime() / 1000);
    if (expiration < now) {
      throw new UnauthorizedException('refresh Token expired!');
    }

    const user = await this.userService.findOneOrThrow(id);

    if (!user || user.passwordChangedAt > new Date()) {
      throw new UnauthorizedException('invalid refresh token');
    }
    const tokens = await this.tokenService.generateTokens({
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      phoneNumber: user.phoneNumber,
      role: user.role.name,
    });
    return { user, ...tokens };
  }
}
