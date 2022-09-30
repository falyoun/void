import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      // delete ret._id;
      delete ret.password;
      // delete ret.password_reset;
      return ret;
    },
  },
  timestamps: true,
})
@ObjectType({ description: 'User' })
export class User {
  @Field((type) => ID, { nullable: true })
  // @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  @Field()
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  @Field()
  firstName: string;

  @Prop({ required: true })
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
export type UserDocument = User & Document;
export const userSchema = SchemaFactory.createForClass(User);
