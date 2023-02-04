import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { AvlPacketModule } from '@app/modules/avl-packets/avl-packet.module';

@Module({
  imports: [AvlPacketModule],
  providers: [TripsService],
  exports: [TripsService],
})
export class TripsModule {}
