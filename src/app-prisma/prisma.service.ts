import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { IAppConfig, IPrisma } from '@app/app-config/app-config.interface';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private configService: ConfigService<IAppConfig>) {
    const userPrisma = configService.get<IPrisma>('usePrisma');
    const url = `${userPrisma.connecter}://${userPrisma.user}:${userPrisma.password}@${userPrisma.host}:${userPrisma.port}/${userPrisma.database}?schema=${userPrisma.schema}`;
    console.log({ url });
    super({
      datasources: {
        db: {
          url,
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
