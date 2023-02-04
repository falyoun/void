import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User' })
export class User {
  @Field()
  email: string;

  //password: string;

  @Field()
  phoneNumber: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  // @Directive('@upper')
  // title: string;
  //
  // @Field()
  // creationDate: Date;
  //
  // @Field((type) => [String])
  // addresses: string[];
}
