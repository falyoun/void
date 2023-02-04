export const GeofenceErrors = {
  NOT_FOUND: {
    message: 'geofence does not exist',
    error: 'not_found_geofence',
  },
  BAD_REQUEST: {
    message: 'Could not process provided data',
    error: 'bad_request',
  },
  SLOT_COUNT_EXCEEDED: {
    message: 'Maximum number of geofences exceeded',
    error: 'limit_exceeded',
  },
  DEVICE_NOT_CONNECTED: {
    message: 'Device is currently offline',
    error: 'device_offline',
  },
};
