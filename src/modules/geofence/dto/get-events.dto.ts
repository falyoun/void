import { IsMongoId, IsOptional } from 'class-validator';

export class GetEventsDto {
  @IsMongoId()
  @IsOptional()
  deviceId?: string;
}
