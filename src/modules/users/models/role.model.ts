import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Role' })
export class Role {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
}
