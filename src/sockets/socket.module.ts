import { forwardRef, Module } from '@nestjs/common';
import { ConnectionPool } from './connection-pool';
import { SocketController } from './controller';
import { TcpConnectionServer } from './tcp/tcp-server';
import { UdpConnectionServer } from './udp/udp-server';
import { DevicesModule } from '@app/modules/devices/devices.module';
import { AvlPacketModule } from '@app/modules/avl-packets/avl-packet.module';
import { LivePreviewWsg } from '@app/web-socket-gateways/live-preview-wsg';
import { GeofenceModule } from '@app/modules/geofence/geofence.module';
import { TripsModule } from '@app/modules/trips/trips.module';
import { LivePreviewModule } from '@app/modules/live-preview/live-preview.module';

@Module({
  imports: [
    forwardRef(() => LivePreviewModule),
    forwardRef(() => AvlPacketModule),
    forwardRef(() => DevicesModule),
    forwardRef(() => TripsModule),
    forwardRef(() => GeofenceModule),
  ],
  providers: [
    ConnectionPool,
    TcpConnectionServer,
    UdpConnectionServer,
    LivePreviewWsg,
  ],
  controllers: [SocketController],
  exports: [ConnectionPool],
})
export class SocketServerModule {}
