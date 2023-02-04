import geofenceConfigMap from './config';
import { GeofenceTypeEnum } from '@app/modules/geofence/dto/create-geofence.dto';
import { SetParameterData } from '@app/sockets/types';
import { Geofence } from '@app/modules/geofence/models/geofence.model';

const geofenceDict = {
  'Shape type': 'shapeType',
  Radius: 'r',
  X1: 'x1',
  Y1: 'y1',
  X2: 'x2',
  Y2: 'y2',
  Priority: 'priority', // SKIP
  Operand: 'operand',
  'Eventual records': 'eventualRecords', // SET TO TRUE
  Overspeeding: 'overspeeding', // SKIP, SET TO FALSE
  'Frame border': 'frameBorder', // SKIP
  'Max allowed speed': 'maxAllowedSpeed', // SKIP
  'Send SMS to': 'sendSmsTo', // SKIP
  'SMS text': 'smsText', // SKIP
};

const geofenceDictKeys = Object.keys(geofenceDict);

export class GeofenceCommandTools {
  static setGeofenceEnableCommand(
    slot: number,
    enable: boolean,
  ): SetParameterData {
    return {
      parameterId: geofenceConfigMap[slot].priority,
      value: (enable ? 2 : 0).toString(),
    };
  }

  static mapGeofenceToCommands(geofence: Geofence): SetParameterData[] {
    const configs = [] as SetParameterData[];

    const push = (parameterId: number, value: string) =>
      configs.push({ parameterId, value });

    push(geofenceConfigMap[geofence.slot]?.shapeType, geofence.shapeType);
    push(geofenceConfigMap[geofence.slot]?.x1, geofence.x1.toString());
    push(geofenceConfigMap[geofence.slot]?.y1, geofence.y1.toString());
    if (geofence.shapeType == GeofenceTypeEnum.RECTANGLE) {
      push(geofenceConfigMap[geofence.slot]?.x2, geofence.x2.toString());
      push(geofenceConfigMap[geofence.slot]?.y2, geofence.y2.toString());
    } else {
      push(
        geofenceConfigMap[geofence.slot]?.radius,
        geofence.radius.toString(),
      );
    }
    push(geofenceConfigMap[geofence.slot]?.operand, '3');
    configs.push(this.setGeofenceEnableCommand(geofence.slot, geofence.enable));

    return configs;
  }

  static buildGeofenceConfigs(data: Geofence | Geofence[]): SetParameterData[] {
    if (!Array.isArray(data)) data = [data];
    const commands = [];
    for (const geofence of data)
      commands.push(...this.mapGeofenceToCommands(geofence));
    return commands;
  }
}
