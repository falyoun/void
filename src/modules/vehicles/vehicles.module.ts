import { forwardRef, Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { DevicesModule } from '@app/modules/devices/devices.module';
import { DriversModule } from '@app/modules/drivers/drivers.module';
import { TripsModule } from '@app/modules/trips/trips.module';

@Module({
  imports: [forwardRef(() => DevicesModule), DriversModule, TripsModule],
  providers: [VehiclesService],
  exports: [VehiclesService],
})
export class VehiclesModule {}
