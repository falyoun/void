import { AvlData } from 'codecs-sdk';
import { DeviceConnection } from '../connection';
import { getCarStatusFromAvl } from '../packet-utils';
import { betweenDates } from '@app/shared/utils/between-dates';
import { calcDistance } from '@app/shared/utils/calc-distance';

const DELTA_TIME_SECONDS = 120;
const DELTA_DIST_METERS = 200;
const DELTA_ANGLE_DEGREES = 10;

export class TripHandler {
  private deviceConnection: DeviceConnection;

  constructor(deviceConnection: DeviceConnection) {
    this.deviceConnection = deviceConnection;
  }

  public async handle(avlData: AvlData[]) {
    let currentTrip = this.deviceConnection.getCurrentTrip();
    const device = this.deviceConnection.getDevice();
    const services = this.deviceConnection.getServices();
    if (!currentTrip) {
      // Create trip and assign it to current trip
      currentTrip = await services.tripService.createTrip({
        steps: [],
        minSpeed: Infinity,
        maxSpeed: 0,
        sumSpeed: 0,
        countSpeed: 0,
        idleDuration: 0,
        movingDuration: 0,
        distance: 0,
        device: device,
      });
      this.deviceConnection.setCurrentTrip(currentTrip);
    }
    return await this.addNewStepToTrip(avlData);
  }

  private async addNewStepToTrip(avlData: AvlData[]) {
    let currentTrip = this.deviceConnection.getCurrentTrip();
    const services = this.deviceConnection.getServices();
    const device = this.deviceConnection.getDevice();
    for (const avl of avlData) {
      const carStatus = getCarStatusFromAvl(avl);
      const gps = { ...avl.gps, address: '' };

      const lastTripStep = currentTrip.steps[currentTrip.steps.length - 1];

      // if car sent STOP multiple times.
      if (carStatus === 'STOP' && lastTripStep?.carStatus === 'STOP')
        // just dont do anything.
        continue;

      // if the car start a new trip.
      if (lastTripStep?.carStatus === 'STOP') {
        await currentTrip.save();
        currentTrip = await services.tripService.createTrip({
          steps: [
            {
              carStatus,
              timestamp: avl.timestamp,
              gps,
            },
          ],
          minSpeed: Infinity,
          maxSpeed: 0,
          sumSpeed: 0,
          countSpeed: 0,
          idleDuration: 0,
          movingDuration: 0,
          distance: 0,
          device,
        });
        this.deviceConnection.setCurrentTrip(currentTrip);
      }
      // if we still in the same trip
      else {
        // first step
        if (!lastTripStep)
          currentTrip.steps.push({
            carStatus,
            timestamp: avl.timestamp,
            gps,
          });
        else {
          const _betweenDates = betweenDates(
              avl.timestamp,
              lastTripStep.timestamp,
            ),
            _distance = calcDistance(
              {
                lat: lastTripStep.gps.latitude,
                lon: lastTripStep.gps.longitude,
              },
              {
                lat: gps.latitude,
                lon: gps.longitude,
              },
            ),
            _angle = Math.abs(lastTripStep.gps.angle - gps.angle);

          if (
            // new car status
            lastTripStep.carStatus !== carStatus ||
            // the time deference between current step and the last one more then DELTA_TIME_SECONDS seconds
            _betweenDates > DELTA_TIME_SECONDS ||
            // the distance deference between current step and the last one more DELTA_DIST_METERS meters
            _distance > DELTA_DIST_METERS ||
            // the angle deference between current step and the last one more DELTA_ANGLE degrees
            _angle > DELTA_ANGLE_DEGREES
          )
            // add the new packet
            currentTrip.steps.push({
              carStatus,
              timestamp: avl.timestamp,
              gps,
            });

          // work on speed stats
          if (carStatus === 'MOVING') {
            currentTrip.minSpeed = Math.min(currentTrip.minSpeed, gps.speed);
            currentTrip.maxSpeed = Math.max(currentTrip.maxSpeed, gps.speed);
            currentTrip.sumSpeed += gps.speed;
            currentTrip.countSpeed += 1;
          }

          // change moving duration
          if (lastTripStep.carStatus === 'MOVING')
            currentTrip.movingDuration += _betweenDates;

          // change idle duration
          if (lastTripStep.carStatus === 'IDLE')
            currentTrip.idleDuration += _betweenDates;

          // change trip total distance
          currentTrip.distance += isNaN(_distance) ? 0 : _distance;
        }
      }
    }
    await currentTrip.save();
  }
}
