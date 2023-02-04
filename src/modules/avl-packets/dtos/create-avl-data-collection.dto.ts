import { AvlData } from 'codecs-sdk';
import { Device } from '@app/modules/devices/models/device.model';

export class CreateAvlDataDto {
  avlRecords: AvlData[];
  device: Device;
  rawPacket?: string;
}
