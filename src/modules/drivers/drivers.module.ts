import { forwardRef, Module } from '@nestjs/common';
import { CarsModule } from '@app/modules/cars/cars.module';
import { DriversService } from '@app/modules/drivers/drivers.service';

@Module({
  imports: [forwardRef(() => CarsModule)],
  providers: [DriversService],
  exports: [DriversService],
})
export class DriversModule {}
