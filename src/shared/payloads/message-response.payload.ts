import { IsString } from 'class-validator';

export class MessageResponsePayload {
  @IsString()
  message: string;
}
