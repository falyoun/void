import { Module } from '@nestjs/common';
import { AppGraphqlModule } from '@app/app-grpahql/app-graphql.module';
import { AppDatabaseModule } from '@app/app-database/app-database.module';
import { AppConfigModule } from '@app/app-config/app-config.module';
import { SharedModule } from '@app/modules/shared.module';
import { AppDefaultController } from '@app/app-controllers/app-default.controller';
import { AppPrismaModule } from './app-prisma/app-prisma.module';

@Module({
  imports: [AppConfigModule, SharedModule, AppGraphqlModule, AppDatabaseModule, AppPrismaModule],
  controllers: [AppDefaultController],
})
export class AppModule {}
