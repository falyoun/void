import { Types } from 'mongoose';

export const reportsAggregations = (
  deviceId: Types.ObjectId,
  from: Date,
  to: Date,
) => ({
  dailyReport: [
    {
      $match: {
        'steps.timestamp': {
          $gte: from,
          $lte: to,
        },
        'device._id': new Types.ObjectId(deviceId),
        $nor: [
          {
            steps: {
              $exists: false,
            },
          },
          {
            steps: {
              $size: 0,
            },
          },
          {
            steps: {
              $size: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        steps: {
          carStatus: 1,
          timestamp: 1,
          gps: 1,
        },
      },
    },
    {
      $unwind: {
        path: '$steps',
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$steps.timestamp',
          },
        },
        steps: {
          $push: '$steps',
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        start: {
          $arrayElemAt: [
            '$steps',
            {
              $indexOfArray: [
                '$steps.timestamp',
                {
                  $min: '$steps.timestamp',
                },
              ],
            },
          ],
        },
        end: {
          $arrayElemAt: [
            '$steps',
            {
              $indexOfArray: [
                '$steps.timestamp',
                {
                  $max: '$steps.timestamp',
                },
              ],
            },
          ],
        },
        steps: {
          $filter: {
            input: '$steps',
            as: 'step',
            cond: { $eq: ['$$step.carStatus', 'MOVING'] },
          },
        },
        durationStats: {
          $function: {
            body: function (data) {
              const diffInSeconds = (a, b) =>
                Math.abs(a.getTime() - b.getTime()) / 1000;
              let stopDuration = 0;
              let movementDuration = 0;
              let idleDuration = 0;
              for (let i = 0, j = 1; i < data.length - 1; i++, j++) {
                const curr = data[i];
                const next = data[j];
                if (next) {
                  if (curr.carStatus === 'STOP')
                    stopDuration += diffInSeconds(
                      new Date(curr.timestamp),
                      new Date(next.timestamp),
                    );
                  else if (curr.carStatus === 'MOVING')
                    movementDuration += diffInSeconds(
                      new Date(curr.timestamp),
                      new Date(next.timestamp),
                    );
                  else if (curr.carStatus === 'IDLE')
                    idleDuration += diffInSeconds(
                      new Date(curr.timestamp),
                      new Date(next.timestamp),
                    );
                }
              }
              const lastStep = data[data.length - 1];
              if (lastStep) {
                const endDayDate = new Date(lastStep.timestamp);
                endDayDate.setUTCHours(23, 59, 59, 999);
                stopDuration += diffInSeconds(
                  new Date(lastStep.timestamp),
                  endDayDate,
                );
              }
              const firstStep = data && data.length > 0 ? data[0] : undefined;
              if (firstStep) {
                const startDayDate = new Date(firstStep.timestamp);
                startDayDate.setUTCHours(0, 0, 0, 0);
                stopDuration += diffInSeconds(
                  new Date(firstStep.timestamp),
                  startDayDate,
                );
              }
              return {
                stop: stopDuration,
                movement: movementDuration,
                idle: idleDuration,
              };
            },
            args: ['$steps'],
            lang: 'js',
          },
        },
      },
    },
    {
      $addFields: {
        speedStats: {
          avg: {
            $avg: '$steps.gps.speed',
          },
          max: {
            $max: '$steps.gps.speed',
          },
          min: {
            $min: '$steps.gps.speed',
          },
        },
        totalDistance: {
          $function: {
            body: function (lat1, lon1, lat2, lon2) {
              const rLat1 = (lat1 * Math.PI) / 180,
                rLat2 = (lat2 * Math.PI) / 180,
                dLon = ((lon2 - lon1) * Math.PI) / 180,
                R = 6371e3;
              return (
                Math.acos(
                  Math.sin(rLat1) * Math.sin(rLat2) +
                    Math.cos(rLat1) * Math.cos(rLat2) * Math.cos(dLon),
                ) * R
              );
            },
            args: [
              '$end.gps.latitude',
              '$end.gps.longitude',
              '$start.gps.latitude',
              '$start.gps.longitude',
            ],
            lang: 'js',
          },
        },
      },
    },
    {
      $group: {
        _id: 'final',
        days: {
          $push: {
            _id: '$_id',
            start: '$start',
            end: '$end',
            speedStats: '$speedStats',
            durationStats: '$durationStats',
            totalDistance: '$totalDistance',
          },
        },
        count: {
          $sum: 1,
        },
        avgSpeed: {
          $avg: '$speedStats.avg',
        },
        totalTime: {
          $sum: '$durationStats.movement',
        },
        totalDistance: {
          $sum: '$totalDistance',
        },
      },
    },
  ],
  dailyDetailedReport: [
    {
      $match: {
        'steps.timestamp': {
          $gte: from,
          $lte: to,
        },
        'device._id': new Types.ObjectId(deviceId),
        $nor: [
          {
            steps: {
              $exists: false,
            },
          },
          {
            steps: {
              $size: 0,
            },
          },
          {
            steps: {
              $size: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        start: {
          $arrayElemAt: ['$steps', 0],
        },
        end: {
          $arrayElemAt: ['$steps', { $subtract: [{ $size: '$steps' }, 1] }],
        },
        steps: {
          $function: {
            body: function (arr) {
              const diffInSeconds = (a, b) =>
                Math.abs(a.getTime() - b.getTime()) / 1000;
              const calcDistance = (
                { latitude: lat1, longitude: lon1 },
                { latitude: lat2, longitude: lon2 },
              ) => {
                const rLat1 = (lat1 * Math.PI) / 180,
                  rLat2 = (lat2 * Math.PI) / 180,
                  dLon = ((lon2 - lon1) * Math.PI) / 180,
                  R = 6371e3;
                return (
                  Math.acos(
                    Math.sin(rLat1) * Math.sin(rLat2) +
                      Math.cos(rLat1) * Math.cos(rLat2) * Math.cos(dLon),
                  ) * R
                );
              };

              for (let i = 0; i < arr.length; i++) {
                const curr = arr[i];
                const next = arr[i + 1];
                if (next) {
                  curr.duration = diffInSeconds(
                    new Date(next.timestamp),
                    new Date(curr.timestamp),
                  );
                  curr.distance = Math.abs(calcDistance(next.gps, curr.gps));
                } else {
                  curr.duration = 0;
                  curr.distance = 0;
                }
              }
              return arr;
            },
            args: ['$steps'],
            lang: 'js',
          },
        },
        speedStats: {
          min: {
            $cond: [
              {
                $eq: ['$minSpeed', Infinity],
              },
              0,
              '$minSpeed',
            ],
          },
          max: '$maxSpeed',
          avg: {
            $cond: [
              {
                $eq: ['$countSpeed', 0],
              },
              0,
              {
                $divide: ['$sumSpeed', '$countSpeed'],
              },
            ],
          },
        },
        durationStats: {
          idle: '$idleDuration',
          movement: '$movingDuration',
        },
        distance: 1,
      },
    },
    {
      $group: {
        _id: 'final',
        trips: {
          $push: {
            _id: '$_id',
            start: '$start',
            end: '$end',
            steps: '$steps',
            speedStats: '$speedStats',
            durationStats: '$durationStats',
            distance: '$distance',
          },
        },
        count: {
          $sum: 1,
        },
        avgSpeed: {
          $avg: '$speedStats.avg',
        },
        totalTime: {
          $sum: '$durationStats.movement',
        },
        totalDistance: {
          $sum: '$distance',
        },
      },
    },
  ],
  locationByIntervalReport: (interval: number | string) => [
    {
      $match: {
        'avlRecords.timestamp': {
          $gt: from,
          $lte: to,
        },
        'device._id': new Types.ObjectId(deviceId),
      },
    },
    {
      $project: {
        avlRecords: {
          timestamp: 1,
          gps: 1,
          ioElements: 1,
        },
      },
    },
    {
      $unwind: {
        path: '$avlRecords',
      },
    },
    {
      $project: {
        timestamp: '$avlRecords.timestamp',
        gps: '$avlRecords.gps',
        carStatus: {
          $function: {
            body: function (avl) {
              const getIoElement = (label, ioElements) => {
                try {
                  return ioElements.filter(
                    (ioSingleElement) => ioSingleElement.label === label,
                  )[0];
                } catch (e) {
                  return null;
                }
              };

              const getCarStatus = (ignition, movement) => {
                if (movement && ignition) return 'MOVING';
                // SLIDING
                if (movement && !ignition) return 'MOVING';
                if (!movement && ignition) return 'IDLE';
                if (!movement && !ignition) return 'STOP';
              };

              return getCarStatus(
                !!getIoElement('Ignition', avl.ioElements).value,
                !!getIoElement('Movement', avl.ioElements).value,
              );
            },
            args: ['$avlRecords'],
            lang: 'js',
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        packets: {
          $push: {
            _id: '$_id',
            timestamp: '$timestamp',
            gps: '$gps',
            carStatus: '$carStatus',
          },
        },
      },
    },
    {
      $addFields: {
        packets: {
          $function: {
            body: function (arr, interval) {
              const intervalInMs = interval * 60 * 1000;
              const res = [arr[0]];
              let currentSearchTime = new Date(
                new Date(arr[0].timestamp).getTime() + intervalInMs,
              ).getTime();
              for (let i = 1; i < arr.length; i++) {
                const curr = arr[i];
                const currTime = new Date(curr.timestamp).getTime();
                if (currTime > currentSearchTime) {
                  currentSearchTime = currTime + intervalInMs;
                  res.push(curr);
                }
              }
              return res;
            },
            args: ['$packets', interval],
            lang: 'js',
          },
        },
      },
    },
    {
      $unwind: {
        path: '$packets',
        includeArrayIndex: '_id',
      },
    },
    {
      $project: {
        baseId: '$packets._id',
        timestamp: '$packets.timestamp',
        gps: '$packets.gps',
        carStatus: '$packets.carStatus',
      },
    },
  ],
});
