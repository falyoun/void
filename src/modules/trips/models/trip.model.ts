import { TripStep } from '@app/modules/trips/payloads/create-trip.payload';
import { Device } from '@app/modules/devices/models/device.model';

export class Trip {
  steps: TripStep[];
  minSpeed: number;
  sumSpeed: number;
  countSpeed: number;
  maxSpeed: number;
  movingDuration: number;
  idleDuration: number;
  distance: number;
  startStep?: TripStep;
  endStep?: TripStep;
  device: Device;
}

//
// TripSchema.pre<TripDocument>('save', function (next) {
//   this.startStep = this.steps[0];
//   this.endStep = this.steps[this.steps.length - 1];
//   next();
// });
