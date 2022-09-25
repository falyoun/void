import { Module } from '@nestjs/common';
import { AppGraphqlModule } from '@app/app-grpahql/app-graphql.module';
import { UsersModule } from '@app/users/users.module';
import { AppDatabaseModule } from '@app/app-database/app-database.module';
import { AppConfigModule } from '@app/app-config/app-config.module';

@Module({
  imports: [AppConfigModule, UsersModule, AppGraphqlModule, AppDatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
