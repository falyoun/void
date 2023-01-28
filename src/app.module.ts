import { Module } from '@nestjs/common';
import { AppGraphqlModule } from '@app/app-grpahql/app-graphql.module';
import { AppConfigModule } from '@app/app-config/app-config.module';
import { AppDefaultController } from '@app/app-controllers/app-default.controller';
import { AppPrismaModule } from '@app/app-prisma/app-prisma.module';
import { RegistrationModule } from '@app/modules/registration/registration.module';

@Module({
  imports: [AppConfigModule, RegistrationModule, AppGraphqlModule, AppPrismaModule],
  controllers: [AppDefaultController],
})
export class AppModule {}
