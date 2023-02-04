import {
  CrashDetectionEnum,
  DataModeEventEnum,
  GNSSStatusEnum,
  GreenDrivingTypeEnum,
  IdlingEventEnum,
  IgnitionEventEnum,
  JammingDetectionEnum,
  MovementEventEnum,
  SleepMoodEventEnum,
  TripEventEnum,
} from '../enums';
import { Device } from '@app/modules/devices/models/device.model';

export class CreateIoElementPacketDto {
  Din1: string;
  SDStatus: string;
  fuelUsedGPS: string;
  averageFuelUse: string;
  SIMICCID1Number: string;
  SIMICCID2Number: string;
  ecoScore: string;
  totalIOdometer: string;
  accelerometerXAxis: string;
  accelerometerYAxis: string;
  accelerometerZAxis: string;
  GSMSignalStrength: string;
  BLE2BatteryVoltage: string;
  BLE3BatteryVoltage: string;
  BLE4BatteryVoltage: string;
  speed: string;
  BLE1Temperature: string;
  BLE2Temperature: string;
  BLE3Temperature: string;
  BLE4Temperature: string;
  BLE1BatteryVoltage: string;
  numberOfDTC: string;
  calculatedEngineLoadValue: string;
  engineCoolantTemperature: string;
  shortTermFuelTrim1: string;
  fuelPressure: string;
  intakeManifoldAbsolutePressure: string;
  engineRPM: string;
  vehicleSpeed: string;
  timingAdvance: string;
  intakeAirTemperature: string;
  MAFAirFlowRate: string;
  throttlePosition: string;
  runTimeSinceEngineStart: string;
  distanceTraveledMILOn: string;
  relativeFuelRailPressure: string;
  directFuelRailPressure: string;
  commandedEGR: string;
  EGRError: string;
  fuelLevel: string;
  distanceTraveledSinceCodesCleared: string;
  barometricPressure: string;
  controlModuleVoltage: string;
  absoluteLoadValue: string;
  ambientAirTemperature: string;
  timeRunWithMILOn: string;
  timeSinceTroubleCodesCleared: string;
  absoluteFuelRailPressure: string;
  hybridBatteryPackRemainingLife: string;
  engineOilTemperature: string;
  fuelInjectionTiming: string;
  engineFuelRate: string;
  extVoltage: string;
  batteryVoltage: string;
  batteryCurrent: string;
  GNSSStatus: GNSSStatusEnum;
  dataMode: DataModeEventEnum;
  BLE1Humidity: string;
  BLE2Humidity: string;
  BLE3Humidity: string;
  BLE4Humidity: string;
  PDOP: string;
  HDOP: string;
  tripOdometer: string;
  sleepMode: SleepMoodEventEnum;
  GSMCellID: string;
  GSMAreaCode: string;
  userID: string;
  ignition: IgnitionEventEnum;
  movement: MovementEventEnum;
  GSMOperator: string;
  greenDrivingEventDuration: string;
  towingDetectionEvent: string;
  CrashDetection: CrashDetectionEnum;
  jammingDetection: JammingDetectionEnum;
  tripEvent: TripEventEnum;
  idlingEvent: IdlingEventEnum;
  unplugEvent: string;
  greenDrivingType: GreenDrivingTypeEnum;
  greenDrivingValue: string;
  overSpeedingEvent: string;
  device: Device;
}
