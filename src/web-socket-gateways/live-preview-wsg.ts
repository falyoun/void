import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket, ServerOptions } from 'socket.io';
import { Logger } from '@nestjs/common';
import { LivePreviewDataModel } from './live-preview-data.model';
import { CreateGeofenceEventPayload } from '@app/modules/geofence/payloads/create-event.payload';

@WebSocketGateway({
  // cors: {
  //   origin: '*',
  // },
  path: '/socket',
  transports: ['websocket', 'polling'],
} as ServerOptions)
export class LivePreviewWsg
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('LivePreviewWsg');

  afterInit(server: Server) {
    this.logger.log('Init');
    console.log('Socket live preview is listening on port: 5050');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('send_message')
  handleMessage(
    @MessageBody() content: string,
    @ConnectedSocket() socket: Socket,
  ) {
    this.server.sockets.emit('receive_message', {
      content,
    });
  }

  sendDeviceData(data: LivePreviewDataModel) {
    console.log(data);
    this.server.sockets.emit('gps-data', data);
  }

  sendGeofenceEvent(data: CreateGeofenceEventPayload) {
    console.log(data);
    this.server.sockets.emit('geofence-data', data);
  }
}
