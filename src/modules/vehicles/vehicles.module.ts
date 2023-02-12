import { forwardRef, Module } from '@nestjs/common';
import { VehiclesService } from './services/vehicles.service';
import { DevicesModule } from '@app/modules/devices/devices.module';
import { DriversModule } from '@app/modules/drivers/drivers.module';
import { TripsModule } from '@app/modules/trips/trips.module';
import { VehiclesResolver } from '@app/modules/vehicles/resolvers/vehicles.resolver';

@Module({
  imports: [forwardRef(() => DevicesModule), DriversModule, TripsModule],
  providers: [VehiclesService, VehiclesResolver],
  exports: [VehiclesService],
})
export class VehiclesModule {}
