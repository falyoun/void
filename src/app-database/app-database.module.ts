import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { IAppConfig, IMongoDB } from '@app/app-config/app-config.interface';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService<IAppConfig>) => {
        const useMongoDB = configService.get<IMongoDB>('useMongoDB');
        console.log({
          uri: process.env.MONGODB_DATABASE_URI,
          configUri: useMongoDB.uri
        })
        return {
          uri: process.env.MONGODB_DATABASE_URI || useMongoDB.uri,
          // replicaSet: dbConfig.replicaSet,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppDatabaseModule {}
