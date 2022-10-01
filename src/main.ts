import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'body-parser';
// import { createNamespace } from 'cls-hooked';
import cookieParser from 'cookie-parser';
import { IAppConfig, IServer } from '@app/app-config/app-config.interface';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { CodedExceptionFilter } from '@app/shared/filters/coded-exception.filter';
import { AllExceptionsFilter } from '@app/shared/filters/all-exceptions.filter';
import { ClassValidatorException } from '@app/shared/exceptions/coded-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
  // app.useWebSocketAdapter(new SocketIoAdapter(app));

  app.enableCors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        console.log('allowed cors for:', origin);
        callback(null, true);
      } else {
        console.log('blocked cors for:', origin);
        callback(null, true);
        // callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders:
      'X-Requested-With, x-organization-id, X-HTTP-Method-Override, Content-Type, Accept, Observe, Origin,X-Requested-With,Accept,Authorization,authorization,X-Forwarded-for',
    methods: 'GET,PUT,POST,PATCH,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });
  const configService = app.get<ConfigService<IAppConfig>>(ConfigService);
  const serverConfig = configService.get<IServer>('server');
  const { port } = serverConfig;
  app.useGlobalFilters(new AllExceptionsFilter(), new CodedExceptionFilter());
  // app.useGlobalInterceptors(new DataResponseInterceptor());
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        console.log(errors);
        return new ClassValidatorException(
          'CLASS_VALIDATOR',
          HttpStatus.BAD_REQUEST,
          `Invalid fields -> (${errors
            .map((e) => `'${e.property}'`)
            .join(', ')})`,
          errors.map((e) => {
            const { target, children, ...otherProps } = e;
            return otherProps;
          }),
        );
      },
    }),
  );
  await app.listen(process.env.PORT || port, () => {
    console.log('App is running on port: ', process.env.PORT || port);
  });
}
bootstrap();
