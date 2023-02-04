import { IoElement, GeofenceIoLabels, AvlData } from 'codecs-sdk';

export enum CarStatus {
  IDLE = 'IDLE',
  STOP = 'STOP',
  MOVING = 'MOVING',
  NONE = 'NONE',
}

export const getIoElement = (label: string, ioElements: IoElement[]) => {
  try {
    return ioElements.find(
      (ioSingleElement) => ioSingleElement.label === label,
    );
  } catch (e) {
    return null;
  }
};

export const getIoElements = (labels: string[], ioElements: IoElement[]) => {
  return ioElements.filter((ioElement) => labels.includes(ioElement.label));
};

export const getGeofenceIoElements = (ioElements: IoElement[]) => {
  return getIoElements(GeofenceIoLabels as unknown as string[], ioElements);
};

export const getCarStatus = (
  ignition: boolean,
  movement: boolean,
): CarStatus => {
  if (!ignition) return CarStatus.STOP;
  if (movement) return CarStatus.MOVING;
  return CarStatus.IDLE;
};

export const getCarStatusFromAvl = (avl: AvlData): CarStatus => {
  const ioIgnition = getIoElement('Ignition', avl.ioElements as any);
  const ioMovement = getIoElement('Movement', avl.ioElements as any);

  const ignition = !!ioIgnition.value;
  const movement = !!ioMovement.value;

  return getCarStatus(ignition, movement);
};
