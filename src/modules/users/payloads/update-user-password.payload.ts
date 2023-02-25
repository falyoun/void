import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserPasswordPayload {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Field()
  old_password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
  @Field()
  password: string;
}
