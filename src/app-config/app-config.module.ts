import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JoiSchema } from './joi-schema';
import { configurationFactory } from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configurationFactory],
      validationSchema: JoiSchema,
    }),
  ],
})
export class AppConfigModule {}
