import { IsMongoId, IsOptional } from 'class-validator';

export class GetEventsPayload {
  @IsMongoId()
  @IsOptional()
  deviceId?: string;
}
