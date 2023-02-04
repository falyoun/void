import { forwardRef, Module } from '@nestjs/common';
import { GeofenceService } from './geofence.service';
import { GeofenceEventService } from './geofence-event.service';
import { DevicesModule } from '@app/modules/devices/devices.module';
import { SocketServerModule } from '@app/sockets/socket.module';

@Module({
  providers: [GeofenceService, GeofenceEventService],
  imports: [
    forwardRef(() => SocketServerModule),
    forwardRef(() => DevicesModule),
  ],
  exports: [GeofenceEventService],
})
export class GeofenceModule {}
