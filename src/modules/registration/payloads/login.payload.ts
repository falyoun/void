import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginPayload {
  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'Please enter email.' })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Please enter password.' })
  password: string;
}
