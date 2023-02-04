export enum GreenDrivingTypeEnum {
  ACCELERATION = 'acceleration',
  BRAKING = 'braking',
  CORNERING = 'cornering',
}

export enum IdlingEventEnum {
  IDLING_ENDED_EVENT = 'idling_ended_event',
  IDLING_STARTED_EVENT = 'idling_started_event',
}
export enum TripEventEnum {
  TRIP_ENDED = 'trip_ended',
  TRIP_STARTED = 'trip_started',
  BUSINESS_STATUS = 'business_status',
  PRIVATE_STATUS = 'private_status',
  CUSTOM_STATUSES = 'custom_statuses',
}
export enum JammingDetectionEnum {
  JAMMING_ENDED = 'jamming_ended',
  JAMMING_DETECTED = 'jamming_detected',
}

export enum CrashDetectionEnum {
  CRASH_DETECTED = 'crash_detected',
  CRASH_TRACE_RECORD = 'crash_trace_record',
}
export enum MovementEventEnum {
  YES = 'yes',
  NO = 'no',
}
export enum IgnitionEventEnum {
  YES = 'yes',
  NO = 'no',
}
export enum SleepMoodEventEnum {
  NO_SLEEP = 'NO_SLEEP',
  GPS_SLEEP = 'gps_sleep',
  DEEP_SLEEP = 'DEEP_SLEEP',
}
export enum DataModeEventEnum {
  HOME_ON_STOP = 'home_on_stop',
  HOME_ON_MOVING = 'home_on_moving',
  ROAMING_ON_STOP = 'roaming_on_stop',
  ROAMING_ON_MOVING = 'roaming_on_moving',
  UNKNOWN_ON_STOP = 'unknown_on_stop',
  UNKNOWN_ON_MOVING = 'unknown_on_moving',
}

export enum GNSSStatusEnum {
  OFF = 'home_on_stop',
  ON_WITH_FIX = 'on_with_fix',
  ON_WITHOUT_FIX = 'on_without_fix',
  IN_SLEEP_STATE = 'in_sleep_state',
}
