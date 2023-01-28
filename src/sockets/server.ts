import { EventEmitter } from 'stream';
import { DevicesService } from '@app/modules/devices/devices.service';

export abstract class ConnectionServer extends EventEmitter {
  protected deviceService: DevicesService;
}
