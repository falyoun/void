import { ConnectionServer } from '../server';
import { Server } from 'net';
import { Injectable } from '@nestjs/common';
import { TcpDeviceConnection } from './tcp-connection';
import { ConnectionPool } from '../connection-pool';
import { ConfigService } from '@nestjs/config';
import { TripsService } from '@app/modules/trips/trips.service';
import { LivePreviewWsg } from '@app/web-socket-gateways/live-preview-wsg';
import { DevicesService } from '@app/modules/devices/devices.service';
import { GeofenceEventService } from '@app/modules/geofence/geofence-event.service';
import { AvlPacketsService } from '@app/modules/avl-packets/avl-packets.service';

@Injectable()
export class TcpConnectionServer extends ConnectionServer {
  private serverSocket?: Server;
  constructor(
    protected devicesService: DevicesService,
    private configService: ConfigService,
    private liveGateway: LivePreviewWsg,
    private avlPacketService: AvlPacketsService,
    private tripsService: TripsService,
    private geofenceEventService: GeofenceEventService,
  ) {
    super();
  }

  public listen(port: number, pool: ConnectionPool): void {
    if (this.serverSocket) throw new Error('Tcp Server is already started!');
    const timeout = +this.configService.get<number>(
      'TCP_SOCKET_TIMEOUT',
      1000 * 60 * 30,
    );
    const serverSocket = new Server((socket) => {
      // initialize TcpConnection instance
      if (timeout) socket.setTimeout(timeout);
      const connection = new TcpDeviceConnection(
        {
          device: this.devicesService,
          liveGateway: this.liveGateway,
          avlPacket: this.avlPacketService,
          tripService: this.tripsService,
          geofenceEvent: this.geofenceEventService,
        },
        socket,
      );
      // wireup events with pool
      connection.once('loaded', (id) => {
        if (pool.hasConnection(id)) {
          const oldConnection = pool.getConnection(id);
          oldConnection.kill();
          oldConnection.removeAllListeners('dead');
          pool._removeConnection(id);
        }
        pool._addConnection(id, connection);

        connection.once('dead', (id) => {
          pool._removeConnection(id);
        });
      });
    });
    serverSocket.listen(port, () =>
      console.log(`TCP Server is listening on port: ${port}`),
    );
    this.serverSocket = serverSocket;
  }
}
