import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from '../payloads/jwt.payload';
import {
  IAppConfig,
  IAuthentication,
} from '@app/app-config/app-config.interface';

@Injectable()
export class TokensService {
  private issuer: string;
  private privateKey: string;
  private publicKey: string;
  constructor(
    private configService: ConfigService<IAppConfig>,
    private readonly jwtService: JwtService,
  ) {
    const auth = configService.get<IAuthentication>('authentication');
    this.issuer = auth.issuer;
    this.privateKey = auth.privateKey;
    this.publicKey = auth.publicKey;
  }
  async generateAccessToken(payload: JwtPayload) {
    const useAccessToken =
      this.configService.get<IAuthentication>('authentication').useAccessToken;

    return await this.jwtService.sign(payload, {
      expiresIn: useAccessToken.expiration,
      privateKey: this.privateKey,
      issuer: this.issuer,
    });
  }
  async generateRefreshToken(payload: JwtPayload) {
    const useRefreshToken =
      this.configService.get<IAuthentication>('authentication').useRefreshToken;

    return await this.jwtService.sign(payload, {
      expiresIn: useRefreshToken.expiration,
      privateKey: this.privateKey,
      issuer: this.issuer,
    });
  }
  async generateTokens(payload: JwtPayload) {
    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }
}
