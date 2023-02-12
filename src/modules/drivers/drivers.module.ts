import { forwardRef, Module } from '@nestjs/common';
import { VehiclesModule } from '@app/modules/vehicles/vehicles.module';
import { DriversService } from '@app/modules/drivers/services/drivers.service';

@Module({
  imports: [forwardRef(() => VehiclesModule)],
  providers: [DriversService],
  exports: [DriversService],
})
export class DriversModule {}
