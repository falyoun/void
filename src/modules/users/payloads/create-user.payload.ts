import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserPayload {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  phoneNumber: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
