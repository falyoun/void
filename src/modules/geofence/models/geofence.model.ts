import { GeofenceTypeEnum } from '@app/modules/geofence/payloads/create-geofence.payload';

export class Geofence {
  _id: string;
  name: string;
  shapeType: GeofenceTypeEnum;
  radius?: number;
  x1: number;
  y1: number;
  x2?: number;
  y2?: number;
  slot: number;
  enable: boolean;
  device: any;
  company: any;
}

// GeofenceSchema.index({ slot: 1, device: 1 }, { unique: true });
