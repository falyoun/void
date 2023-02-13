import { Module } from '@nestjs/common';
import { LoginService } from '@app/modules/registration/services/login.service';
import { LoginResolver } from '@app/modules/registration/resolvers/login.resolver';
import { TokensService } from '@app/modules/registration/services/tokens.service';
import { UsersModule } from '@app/modules/users/users.module';
import { OTPService } from './services/otp.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppPrismaModule } from '@app/app-prisma/app-prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtGuard } from './guards/jwt.guard';
import { TwilioModule } from 'nestjs-twilio';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import {
  IAppConfig,
  IAuthentication,
  ITwilio,
} from '@app/app-config/app-config.interface';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    AppPrismaModule,
    JwtModule.registerAsync({
      imports: [],
      useFactory: async (configService: ConfigService<IAppConfig>) => ({
        publicKey: Buffer.from(
          configService.get<IAuthentication>('authentication').publicKey,
          'base64',
        ).toString('ascii'),
        privateKey: Buffer.from(
          configService.get<IAuthentication>('authentication').privateKey,
          'base64',
        ).toString('ascii'),
        signOptions: {
          algorithm: 'RS256',
          expiresIn:
            configService.get<IAuthentication>('authentication').useAccessToken
              .expiration,
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
      inject: [ConfigService],
    }),
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IAppConfig>) => ({
        accountSid: configService.get<ITwilio>('useTwilio').accountSid,
        authToken: configService.get<ITwilio>('useTwilio').authToken,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    LoginService,
    JwtStrategy,
    JwtGuard,
    JwtRefreshTokenStrategy,
    JwtRefreshGuard,
    LoginResolver,
    TokensService,
    OTPService,
  ],
  exports: [
    LoginService,
    JwtStrategy,
    JwtGuard,
    JwtRefreshTokenStrategy,
    JwtRefreshGuard,
  ],
})
export class RegistrationModule {}
