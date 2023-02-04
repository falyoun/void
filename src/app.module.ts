import { Module } from '@nestjs/common';
import { AppGraphqlModule } from '@app/app-grpahql/app-graphql.module';
import { AppConfigModule } from '@app/app-config/app-config.module';
import { AppDefaultController } from '@app/app-controllers/app-default.controller';
import { AppPrismaModule } from '@app/app-prisma/app-prisma.module';
import { RegistrationModule } from '@app/modules/registration/registration.module';
import { SocketServerModule } from '@app/sockets/socket.module';
import { DevicesModule } from '@app/modules/devices/devices.module';
import { VehiclesModule } from '@app/modules/vehicles/vehicles.module';
import { UsersModule } from '@app/modules/users/users.module';
import { DriversModule } from '@app/modules/drivers/drivers.module';
import { AvlPacketModule } from '@app/modules/avl-packets/avl-packet.module';
import { GeofenceModule } from '@app/modules/geofence/geofence.module';
import { TripsModule } from '@app/modules/trips/trips.module';
import { LivePreviewModule } from '@app/modules/live-preview/live-preview.module';

@Module({
  imports: [
    AppConfigModule,
    RegistrationModule,
    AppGraphqlModule,
    AppPrismaModule,
    TripsModule,
    UsersModule,
    DevicesModule,
    VehiclesModule,
    DriversModule,
    AvlPacketModule,
    LivePreviewModule,
    SocketServerModule,
    GeofenceModule,
  ],
  controllers: [AppDefaultController],
})
export class AppModule {}
