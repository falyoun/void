import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class VerificationPayload {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Please enter phoneNumber.' })
  phoneNumber: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Please enter otp.' })
  otp: string;
}
