import { Module } from '@nestjs/common';
import { LoginService } from '@app/modules/registration/services/login.service';
import { LoginResolver } from '@app/modules/registration/resolvers/login.resolver';
import { TokensService } from '@app/modules/registration/services/tokens.service';
import { UsersModule } from '@app/modules/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [LoginService, LoginResolver, TokensService],
})
export class RegistrationModule {}
