import { DeviceConnection } from '../connection';
import { Socket } from 'net';
import { ConnectionServices, DeviceCommand } from '../types';
import { TcpPacketParser } from './tcp-parser';
import { AvlDataCollection } from 'codecs-sdk';
export class TcpDeviceConnection extends DeviceConnection {
  private socket: Socket;
  constructor(services: ConnectionServices, socket: Socket) {
    super(services, 'TCP');
    this.socket = socket;
    // bind events
    this.logger.debug('Socket connected');
    socket.on('data', this.onDataReceived.bind(this));
    socket.on('close', this.onCloseReceived.bind(this));
    socket.on('end', this.onEndReceived.bind(this));
    socket.on('error', this.onErrorReceived.bind(this));
    socket.on('timeout', this.onTimeoutReceived.bind(this));
  }

  public sendCommand(cmd: DeviceCommand) {
    const packet = new TcpPacketParser(cmd).encodeCommand();
    this.socket.write(packet);
  }

  protected async die(closeSocket = false) {
    if (!(await super._die())) return;
    if (closeSocket) this.socket.end();
  }
  public kill() {
    this.socket.end();
  }

  protected handleAvl(decodedAvl: AvlDataCollection, data: Buffer) {
    super.handleAvl(decodedAvl, data);
    const response = Buffer.allocUnsafe(4);
    response.writeUInt32BE(decodedAvl.numberOfRecords1);
    this.socket.write(response);
  }

  private onPacketReceived(data: Buffer) {
    const parser = new TcpPacketParser(data);
    try {
      parser.decodePacket(this.handleAvl.bind(this));
    } catch (err) {
      this.logger.error(err);
      this.socket.end();
    }
  }

  private async onImeiReceived(data: Buffer) {
    const parser = new TcpPacketParser(data);
    try {
      const imei = parser.decodeImei();
      if (
        await this.load(imei, 'TCP', async () => {
          this.socket.write(new Uint8Array([0]));
          this.socket.end();
        })
      )
        this.socket.write(new Uint8Array([1]));
    } catch (err) {
      this.logger.error(err);
      this.socket.end();
    }
  }

  //Event Handlers
  private async onDataReceived(data: Buffer) {
    if (this.IMEI) {
      await this.onPacketReceived(data);
    } else {
      await this.onImeiReceived(data);
    }
  }
  private async onCloseReceived(hadError: boolean) {
    this.logger[hadError ? 'warn' : 'debug']('Socket closed');
    await this.die();
  }
  private async onEndReceived() {
    this.logger.debug('Socket end');
    await this.die();
  }
  private async onErrorReceived(error: Error) {
    this.logger.error(error);
    await this.die(true);
  }
  private async onTimeoutReceived() {
    this.logger.warn('Timeout');
    await this.die(true);
  }
}
