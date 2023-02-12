import { EventEmitter } from 'stream';
import { DevicesService } from '@app/modules/devices/services/devices.service';

export abstract class ConnectionServer extends EventEmitter {
  protected deviceService: DevicesService;
}
