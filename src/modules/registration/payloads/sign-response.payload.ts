import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@app/modules/users/models/user.model';

@ObjectType()
export class SignResponsePayload {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => User)
  user: User;
}
