import {
  Injectable,
  Logger,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../payloads/jwt.payload';
import { UsersService } from '@app/modules/users/services/users.service';
import {
  IAppConfig,
  IAuthentication,
} from '@app/app-config/app-config.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger: Logger = new Logger('JwtStrategy');

  constructor(
    private readonly configService: ConfigService<IAppConfig>,
    private readonly userService: UsersService,
  ) {
    console.log('JwtStrategy');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get<IAuthentication>('authentication').privateKey,
      //    ignoreExpiration: configService.get<boolean>('IGNORE_EXPIRATION'),
      issuer: configService.get<IAuthentication>('authentication').issuer,
      algorithms: ['RS256'],
      passReqToCallback: true,
    });
  }

  async validate(req, payload: JwtPayload) {
    try {
      console.log('validate');
      const { id } = payload;

      const user = await this.userService.findOneById(id);

      if (!user || user.passwordChangedAt > new Date()) {
        throw new UnauthorizedException('invalid access token');
      }
      return user;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
