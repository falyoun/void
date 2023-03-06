import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GenerateReportPayload } from './payloads/generate-report.payload';
import { readFileSync } from 'fs';
import HandleBars from 'handlebars';
import { join } from 'path';
import { GetTripsPayload } from './payloads/get-trips.payload';
import { Trip } from '@app/modules/trips/models/trip.model';
import { CreateTripPayload } from '@app/modules/trips/payloads/create-trip.payload';
import { AvlPacketsService } from '@app/modules/avl-packets/avl-packets.service';
import { metersToDistance } from '@app/shared/utils/meters-to-distance';
import { VehiclesService } from '@app/modules/vehicles/vehicles.service';
import { secondsToDuration } from '@app/shared/utils/seconds-to-time';

export type AggregationResult = {
  _id: 'final';
  days: any[];
  count: number;
  avgSpeed: number;
  totalTime: number;
  totalDistance: number;
};

// const ReportsTemplates = {
//   consolidated: readFileSync(
//     join(process.cwd(), 'public/reports', 'daily.html'),
//   ).toString(),
//   detailedTrip: readFileSync(
//     join(process.cwd(), 'public/reports', 'detailed-trip.html'),
//   ).toString(),
//   location: readFileSync(
//     join(process.cwd(), 'public/reports', 'location.html'),
//   ).toString(),
// };

HandleBars.registerHelper('to-time', secondsToDuration);
HandleBars.registerHelper('to-distance', metersToDistance);
HandleBars.registerHelper('to-km', (m: number | string) =>
  (+m / 1000).toFixed(3),
);
HandleBars.registerHelper('to-iso-string', (date: string | Date) =>
  new Date(date).toISOString(),
);
HandleBars.registerHelper('round', (num: number | string, points: number) =>
  (+num).toFixed(points),
);

@Injectable()
export class TripsService {
  constructor(
    // private readonly tripDocument: Trip,
    private readonly avlPacketsServices: AvlPacketsService,
  ) {}

  createTrip(createTripPayload: CreateTripPayload) {
    // return this.tripDocument.create(createTripPayload);
  }

  async getLatestTrip(deviceId: string) {}

  async generateReport({
    deviceId,
    reportType,
    fromDate,
    toDate,
    interval = 30,
  }: GenerateReportPayload) {}

  public findAll(payload: GetTripsPayload, companyFilter: any) {}

  public findOne(tripId: string, companyFilter: any) {}
}
