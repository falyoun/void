import { IsDate } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class ConsolidatedQueryPayload {
  @Expose()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  fromDate: Date;

  @Expose()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  toDate: Date;
}
