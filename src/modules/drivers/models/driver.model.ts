import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Car } from '@app/modules/cars/models';

@Schema({ timestamps: true })
export class Driver {
  _id: Types.ObjectId;
  name: string;
  emirateId: string;
  car?: Car | Types.ObjectId;

  @Prop({
    type: [MongooseSchema.Types.Mixed],
    required: false,
    default: [],
  })
  cars: Car[] | Types.ObjectId[];
}
