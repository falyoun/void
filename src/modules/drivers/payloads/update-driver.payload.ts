import { Field, InputType } from '@nestjs/graphql';
import { CreateDriverPayload } from './create-driver.payload';
import { PartialType, PickType } from '@nestjs/mapped-types';
@InputType() // extends PartialType(PickType(CreateDriverPayload, ['car'])) {}
export class UpdateDriverPayload {
    @Field()
    isRenting:boolean;
}
