import { forwardRef, Module } from '@nestjs/common';
import { VehiclesModule } from '@app/modules/vehicles/vehicles.module';
import { DriversService } from '@app/modules/drivers/drivers.service';
import { UsersModule } from '../users/users.module';
import { AppPrismaModule } from '@app/app-prisma/app-prisma.module';
import { DriversResolver } from './resolvers/driver.resolver';

@Module({
  imports: [forwardRef(() => VehiclesModule), UsersModule, AppPrismaModule],
  providers: [DriversService,DriversResolver],
  exports: [DriversService],
})
export class DriversModule {}
