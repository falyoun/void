import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginPayload } from '@app/modules/registration/payloads/login.payload';
import { User } from '@app/modules/users/models/user.model';

@Resolver()
export class LoginResolver {
  @Mutation(() => User)
  login(@Args('payload') request: LoginPayload) {}
}
