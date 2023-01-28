import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { TripStep } from '@app/modules/trips/dtos/create-trip.dto';
import { Device } from '@app/modules/devices/models/device.model';

@Schema({ timestamps: true })
export class Trip {
  @Prop({ type: [MongooseSchema.Types.Mixed] })
  steps: TripStep[];

  @Prop()
  minSpeed: number;

  @Prop()
  sumSpeed: number;

  @Prop()
  countSpeed: number;

  // @Prop({ get: ({ sumSpeed, countSpeed }) => sumSpeed / countSpeed })
  // avgSpeed: number;

  @Prop()
  maxSpeed: number;

  @Prop()
  movingDuration: number;

  @Prop()
  idleDuration: number;

  @Prop()
  distance: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  startStep?: TripStep;
  @Prop({ type: MongooseSchema.Types.Mixed })
  endStep?: TripStep;

  @Prop({
    type: MongooseSchema.Types.Mixed,
  })
  device: Device;
}

//
// TripSchema.pre<TripDocument>('save', function (next) {
//   this.startStep = this.steps[0];
//   this.endStep = this.steps[this.steps.length - 1];
//   next();
// });
