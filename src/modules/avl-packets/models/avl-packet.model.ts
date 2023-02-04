import { AvlData } from 'codecs-sdk';
import { Device } from '@app/modules/devices/models/device.model';

export class AvlPacket {
  avlRecords: AvlData[];
  rawPacket: string;
  device: Device;
}
