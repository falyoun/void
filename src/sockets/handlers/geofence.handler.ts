import { AvlData, IoElement } from 'codecs-sdk';
import { DeviceConnection } from '../connection';
import { getGeofenceIoElements } from '../packet-utils';
import { GeofenceEventType } from '@app/modules/geofence/enums';

function valueToEventType(val) {
  switch (val) {
    case 0:
      return GeofenceEventType.VIOLATION_ENDED;
    case 1:
      return GeofenceEventType.VIOLATION_STARTED;
  }
}
export class GeofenceHandler {
  private deviceConnection: DeviceConnection;

  constructor(deviceConnection: DeviceConnection) {
    this.deviceConnection = deviceConnection;
  }

  public async handle(data: AvlData[]) {
    let geoIos = [] as (IoElement & { createdAt: Date })[];
    const device = this.deviceConnection.getDevice();
    data.forEach((avlItem) => {
      geoIos.push(
        ...getGeofenceIoElements(avlItem.ioElements as any).map((ioElem) => ({
          ...ioElem,
          createdAt: avlItem.timestamp,
        })),
      );
    });
    geoIos = geoIos.filter((ioElem) => +ioElem.value <= 1);
    const slots = new Set<number>();
    geoIos.forEach((geoIo) => {
      slots.add(+geoIo.dimension);
      this.deviceConnection.getLogger().log(geoIo);
    });
    const geofence = await this.deviceConnection
      .getServices()
      .device.findGeofences({
        deviceId: device._id,
        slots: Array.from(slots.values()),
      });
    const geofenceSlotMap = new Map<number, any>();
    geofence.forEach((geofence) =>
      geofenceSlotMap.set(geofence.slot, geofence),
    );

    const events = geoIos.map((geoIo) => ({
      eventType: valueToEventType(+geoIo.value),
      geofence: geofenceSlotMap.get(+geoIo.dimension),
      device,
    }));

    await this.deviceConnection.getServices().geofenceEvent.create(events);

    events.forEach((event) => {
      this.deviceConnection.getServices().liveGateway.sendGeofenceEvent(event);
    });
  }
}
