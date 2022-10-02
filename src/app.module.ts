import { Module } from '@nestjs/common';
import { AppGraphqlModule } from '@app/app-grpahql/app-graphql.module';
import { AppDatabaseModule } from '@app/app-database/app-database.module';
import { AppConfigModule } from '@app/app-config/app-config.module';
import { SharedModule } from '@app/modules/shared.module';
import { AppDefaultController } from '@app/app-controllers/app-default.controller';

@Module({
  imports: [AppConfigModule, SharedModule, AppGraphqlModule, AppDatabaseModule],
  controllers: [AppDefaultController],
  providers: [],
})
export class AppModule {}
