import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@app/modules/users/services/users.service';
import { LoginPayload } from '../payloads/login.payload';
import * as bcrypt from 'bcrypt';
import { OTPService } from './otp.service';
import { VerificationPayload } from '../payloads/verification.payload';
import { JwtPayload } from '../payloads/jwt.payload';
import { TokensService } from './tokens.service';
import { OtpLoginPayload } from '../payloads/otp-login.payload';
import { Role } from '@prisma/client';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly otpService: OTPService,
    private readonly tokenService: TokensService,
  ) {}
  async login(loginPayload: LoginPayload) {
    const user = await this.usersService.findOneOrThrow(loginPayload.email);

    if (user && (await bcrypt.compare(loginPayload.password, user.password))) {
      const payload: JwtPayload = {
        id: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
        phoneNumber: user.phoneNumber,
        role: user.role ? user.role.name : 'guest',
      };
      return await this.getNewTokens(payload);
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async OtpLogin(loginPayload: OtpLoginPayload) {
    const user = await this.usersService.findOneOrThrow(
      loginPayload.phoneNumber,
    );
    if (user) {
      return (await this.otpService.generateOTP(user)) ? true : false;
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  // verify otp
  async verifyOTP(request: VerificationPayload) {
    const user = await this.usersService.findOneOrThrow(request.phoneNumber);

    const result = await this.otpService.verifyOTP(
      request.otp,
      request.phoneNumber,
    );
    if (!result) {
      throw new UnauthorizedException('Please check your otp');
    }
    const payload: JwtPayload = {
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      phoneNumber: user.phoneNumber,
      role: user.role.name,
    };
    return await this.getNewTokens(payload);
  }

  async getNewTokens(user: JwtPayload) {
    const accessToken = await this.tokenService.generateAccessToken(user);
    const refreshToken = await this.tokenService.generateRefreshToken(user);
    return {
      accessToken,
      refreshToken,
    };
  }
}
