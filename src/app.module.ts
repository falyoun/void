import { Module } from '@nestjs/common';
import { AppGraphqlModule } from '@app/app-grpahql/app-graphql.module';
import { AppConfigModule } from '@app/app-config/app-config.module';
import { SharedModule } from '@app/modules/shared.module';
import { AppDefaultController } from '@app/app-controllers/app-default.controller';
import { AppPrismaModule } from '@app/app-prisma/app-prisma.module';

@Module({
  imports: [AppConfigModule, SharedModule, AppGraphqlModule, AppPrismaModule],
  controllers: [AppDefaultController],
  
})
export class AppModule {}
