import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConnectionPool } from './connection-pool';

@Controller('device-sockets')
@ApiTags('Device Sockets')
@ApiBearerAuth('access-token')
export class SocketController {
  constructor(private pool: ConnectionPool) {}
  @Get()
  public getConnectedIds() {
    return this.pool.getConnectedDeviceIds();
  }
}
