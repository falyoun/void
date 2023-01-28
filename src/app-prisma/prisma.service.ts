import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: `
          ${configService.get<string>('DB_CONNECTOR')}://
          ${configService.get<string>('DB_USER')}:
          ${configService.get<string>('DB_PASSWORD')}@
          ${configService.get<string>('DB_HOST')}:
          ${configService.get<string>('DB_PORT')}/
          ${configService.get<string>('DB_NAME')}?
          schema=${configService.get<string>('public')}`,
        },
      },
    });
  }
  async onModuleInit() {
    
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
