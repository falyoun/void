import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@app/modules/users/services/users.service';
import { LoginPayload } from '../payloads/login.payload';
import * as bcrypt from 'bcrypt';
import { OTPService } from './otp.service';
import { VerificationPayload } from '../payloads/verification.payload';
import { JwtPayload } from '../payloads/jwt.payload';
import { TokensService } from './tokens.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly otpService: OTPService,
    private readonly tokenService: TokensService,
  ) {}
  async login(loginPayload: LoginPayload) {
    const user = await this.usersService.findOneByPhoneNumber(
      loginPayload.phoneNumber,
    );
    console.log(user);
    if (user && (await bcrypt.compare(loginPayload.password, user.password))) {
      (await this.otpService.generateOTP(user)) ? true : false;
      return user;
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  // verify otp
  async verifyOTP(request: VerificationPayload) {
    const user = await this.usersService.findOneByPhoneNumber(
      request.phoneNumber,
    );

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
    };
    const accessToken = await this.tokenService.generateAccessToken(payload);
    const refreshToken = await this.tokenService.generateRefreshToken(payload);
    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
