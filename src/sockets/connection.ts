import { Logger } from '@nestjs/common';
import { EventEmitter } from 'events';
import { ConnectionServices, DeviceCommand } from './types';
import * as uuid from 'uuid';
import { CallQueue } from './call-queue';
import { AvlDataCollection } from 'codecs-sdk';
import { getCarStatusFromAvl } from './packet-utils';
import { TripHandler } from './handlers/trip.handlers';
import { GeofenceHandler } from './handlers/geofence.handler';

export abstract class DeviceConnection extends EventEmitter {
  protected IMEI: string;
  protected device: any;
  protected currentTrip: any;

  protected logger: Logger;
  protected services: ConnectionServices;
  public uuid;
  private isDead = false;

  private queue: CallQueue;

  public abstract sendCommand(cmd: DeviceCommand);

  public getIMEI() {
    return this.IMEI;
  }
  public getDevice() {
    return this.device;
  }
  public getCurrentTrip() {
    return this.currentTrip;
  }
  public setCurrentTrip(trip: any) {
    this.currentTrip = trip;
  }
  public getLogger() {
    return this.logger;
  }
  public getServices() {
    return this.services;
  }

  constructor(services: ConnectionServices, loggerName: string) {
    super();
    this.logger = new Logger(loggerName);
    this.services = services;
    this.uuid = uuid.v4();
    this.queue = new CallQueue();
  }

  protected handleAvl(data: AvlDataCollection, rawPacket: Buffer) {
    const lastAvl = data.avlData[data.avlData.length - 1];
    // update device status and location
    const currentCarStatus = getCarStatusFromAvl(lastAvl);
    this.device.lastCarStatus = currentCarStatus;
    this.device.lastLocation = lastAvl.gps;
    // handle live preview data
    data.avlData.forEach((avl) => {
      this.services.liveGateway.sendDeviceData({
        gps: avl.gps,
        timestamp: avl.timestamp,
        deviceIMEI: this.device.IMEI,
        carStatus: getCarStatusFromAvl(avl),
      });
    });
    // save updates to device
    this.queue.push(() => this.device.save());
    // save raw avl data
    this.queue.push(() =>
      this.services.avlPacket.createAvlPacket({
        avlRecords: data.avlData,
        device: this.device,
        rawPacket: rawPacket.toString('hex'),
      }),
    );
    // handle trip
    this.queue.push(() => new TripHandler(this).handle(data.avlData));
    // handle geofence
    this.queue.push(() => new GeofenceHandler(this).handle(data.avlData));
  }

  protected async load(
    IMEI: string,
    type: string,
    declineCallback?: () => Promise<void>,
  ) {
    if (!this.IMEI) {
      try {
        this.logger = new Logger(`${type}: ${IMEI}`);
        this.device = await this.services.device.findOne({ IMEI: IMEI });
        this.IMEI = IMEI;
        this.emit('loaded', this.device.id);
        return true;
      } catch (err) {
        if (declineCallback) await declineCallback();
      }
    }
  }

  protected async _die(): Promise<boolean> {
    if (this.isDead) return false;
    this.isDead = true;
    if (this.device) this.emit('dead', this.device.id);
    return true;
  }
  protected abstract die();
  public abstract kill();

  // EVENTS

  emit(event: 'dead', id: string): boolean;
  emit(event: 'loaded', id: string): boolean;

  emit(event: string, ...data: any[]): boolean {
    return super.emit(event, ...data);
  }

  once(event: 'dead', listener: (id: string) => void): this;
  once(event: 'loaded', listener: (id: string) => void): this;

  once(event: string, listener: (...args: any[]) => void): this {
    return super.once(event, listener);
  }
  on(event: string, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }
}
