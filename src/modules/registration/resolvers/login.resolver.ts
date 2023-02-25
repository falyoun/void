import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginPayload } from '@app/modules/registration/payloads/login.payload';
import { User } from '@app/modules/users/models/user.model';
import { LoginService } from '../services/login.service';
import { VerificationPayload } from '../payloads/verification.payload';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { RoleGuard } from '../guards/role.guard';
import { Role } from '@prisma/client';
import { OtpLoginPayload } from '../payloads/otp-login.payload';
import { SignResponsePayload } from '../payloads/sign-response.payload';
@Resolver()
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Mutation(() => SignResponsePayload)
  login(@Args('payload') request: LoginPayload) {
    return this.loginService.login(request);
  }

  @Mutation(() => Boolean)
  OtpLogin(@Args('payload') request: OtpLoginPayload) {
    return this.loginService.OtpLogin(request);
  }

  // verify otp
  @Mutation(() => SignResponsePayload)
  verifyOTP(@Args('payload') request: VerificationPayload) {
    return this.loginService.verifyOTP(request);
  }

  @UseGuards(JwtGuard)
  @Query(() => String)
  hello() {
    return 'hello world';
  }

  @UseGuards(RoleGuard([Role.ADMIN]))
  @UseGuards(JwtRefreshGuard)
  @Query(() => String)
  hello2() {
    return 'hello world';
  }
  @UseGuards(JwtRefreshGuard)
  @Mutation(() => SignResponsePayload)
  getNewTokens(@GetUser() user) {
    return user;
  }
}
