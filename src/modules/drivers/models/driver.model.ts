import { Vehicle } from '@app/modules/vehicles/models/vehicles.model';

export class Driver {
  _id: string;
  name: string;
  emirateId: string;
  vehicle?: Vehicle;
  vehicles: Vehicle[];
}
