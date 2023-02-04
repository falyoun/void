import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeviceConnection } from './connection';
import { TcpConnectionServer } from './tcp/tcp-server';
import { UdpConnectionServer } from './udp/udp-server';

@Injectable()
export class ConnectionPool {
  private deviceConnections = new Map<string, DeviceConnection>();

  constructor(
    private configService: ConfigService,
    private tcpConnectionServer: TcpConnectionServer,
    private udpConnectionServer: UdpConnectionServer,
  ) {
    const tcpPort = this.configService.get<number>('TCP_SERVER_PORT');
    const udpPort = this.configService.get<number>('UDP_SERVER_PORT');

    this.startTcp(tcpPort);
  }

  public _addConnection(id: string, connection: DeviceConnection) {
    this.deviceConnections.set(id, connection);
  }
  public _removeConnection(id: string) {
    if (this.deviceConnections.has(id)) this.deviceConnections.delete(id);
  }

  public hasConnection(id: string): boolean {
    return this.deviceConnections.has(id);
  }
  public getConnection(id: string): DeviceConnection {
    return this.deviceConnections.get(id);
  }
  public getConnectedDeviceIds(): string[] {
    return Array.from(this.deviceConnections.keys());
  }
  public getConnectionIds(): string[] {
    return Array.from(this.deviceConnections.values()).map(item => item.uuid);
  }

  private startUdp(port: number) {}
  private startTcp(port: number) {
    this.tcpConnectionServer.listen(port, this);
  }
}
