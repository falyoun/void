import { Module } from '@nestjs/common';
import { RegistrationModule } from '@app/modules/registration/registration.module';

@Module({
  imports: [RegistrationModule],
})
export class SharedModule {}
