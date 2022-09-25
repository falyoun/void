import { Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

export class SignUpDto {
  @Field({ nullable: true })
  @IsOptional()
  country?: string;

  @Field((type) => [String])
  addresses: string[];
}
