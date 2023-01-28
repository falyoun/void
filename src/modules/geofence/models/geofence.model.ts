import { Types } from 'mongoose';
import { GeofenceTypeEnum } from '@app/modules/geofence/dto/create-geofence.dto';

export class Geofence {
  _id: Types.ObjectId;
  name: string;
  shapeType: GeofenceTypeEnum;
  radius?: number;
  x1: number;
  y1: number;
  x2?: number;
  y2?: number;
  slot: number;
  enable: boolean;
  device: Types.ObjectId | any;
  company: Types.ObjectId | any;
}

// GeofenceSchema.index({ slot: 1, device: 1 }, { unique: true });
