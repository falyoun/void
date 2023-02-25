import {
  IsDate,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export type ReportsType = 'consolidated' | 'detailedTrip' | 'location';
export class GenerateReportPayload {
  @Expose()
  @IsNotEmpty()
  @IsIn(['consolidated', 'detailedTrip', 'location'] as ReportsType[])
  reportType: ReportsType;

  @Expose()
  @IsNotEmpty()
  @IsMongoId()
  deviceId: string;

  @Expose()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  fromDate: Date;

  @Expose()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  toDate: Date;

  @Expose()
  @ValidateIf((o) => o.reportType === 'location')
  @IsNotEmpty()
  @Type(() => Number)
  interval?: number;
}
