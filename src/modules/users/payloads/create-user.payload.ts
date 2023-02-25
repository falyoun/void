import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserPayload {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  phoneNumber: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  lastName: string;
}
