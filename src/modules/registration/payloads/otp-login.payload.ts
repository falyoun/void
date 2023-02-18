import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class OtpLoginPayload {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Please enter phoneNumber.' })
  phoneNumber: string;

  
}
