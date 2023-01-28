import { forwardRef, Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { AvlPacketModule } from '@app/modules/avl-packets/avl-packet.module';
import { CarsModule } from '@app/modules/cars/cars.module';

@Module({
  imports: [AvlPacketModule, forwardRef(() => CarsModule)],
  providers: [TripsService],
  exports: [TripsService],
})
export class TripsModule {}
