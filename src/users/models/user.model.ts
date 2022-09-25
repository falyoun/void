import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User' })
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Directive('@upper')
  title: string;

  @Field()
  creationDate: Date;

  @Field((type) => [String])
  addresses: string[];
}
