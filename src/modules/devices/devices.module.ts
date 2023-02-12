import { Module } from '@nestjs/common';
import { DevicesService } from './services/devices.service';
import { DevicesResolver } from '@app/modules/devices/resolvers/devices.resolver';

@Module({
  providers: [DevicesService, DevicesResolver],
  exports: [DevicesService],
})
export class DevicesModule {}
