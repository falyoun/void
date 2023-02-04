import {
  IsDate,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Types } from 'mongoose';

export type ReportsType = 'consolidated' | 'detailedTrip' | 'location';
export class GenerateReportDto {
  @Expose()
  @IsNotEmpty()
  @IsIn(['consolidated', 'detailedTrip', 'location'] as ReportsType[])
  reportType: ReportsType;

  @Expose()
  @IsNotEmpty()
  @IsMongoId()
  deviceId: Types.ObjectId;

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
