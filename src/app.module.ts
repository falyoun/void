import { Module } from '@nestjs/common';
import { AppGraphqlModule } from '@app/app-grpahql/app-graphql.module';
import { UsersModule } from '@app/users/users.module';

@Module({
  imports: [UsersModule, AppGraphqlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
