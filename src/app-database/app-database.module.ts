import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        // const dbConfig = configService.get('db');
        return {
          uri: 'mongodb://localhost/void',
          // replicaSet: dbConfig.replicaSet,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppDatabaseModule {}
