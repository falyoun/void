export interface IMongoDB {
  uri: string;
}
export interface ISwagger {
  title: string;
  version: string;
  description: string;
  tag: string;
  api: string;
  useAuth?: {
    username: string;
    password: string;
  };
}
export interface IAuth {
  secretKey: string;
  useCookies: {
    expiration: number;
  };
  useAccessToken: {
    expiration: string;
  };
  useRefreshToken?: {
    expiration: string;
  };
}
export interface IOrganizationInvitationAuth {
  useAccessToken: {
    expiration: string;
  };
  callbackUrl: string;
}

export interface IMandrill {
  apiKey: string;
  fromEmail: string;
  fromName: string;
}
export interface IThrottle {
  ttl: number;
  limit: number;
}
export interface IServer {
  port: number;
  apiPrefix: string;
  throttle: IThrottle;
  swagger: ISwagger;
  mandrill: IMandrill;
}

export interface IToken {
  secretKey: string;
  expiration: string;
}

export interface IGeneratedTokenConfig {
  registrationToken: IToken;
  forgotPasswordToken: IToken;
}

export interface ICmsUrls {
  forgotPassword: string;
  registrationInvitation: string;
  acceptInvitation: string;
}

export interface IPedant {
  baseUrl: string;
  uploadFileEndpoint: string;
  authKey: string;
}
export interface IDapi {
  appSecret: string;
  appKey: string;
  ddToken: string;
}
export interface IS3 {
  bucket: string;
  cloudFront?: {
    privateKey: string;
    domain: string;
    keyPairId: string;
  };
}
export interface ICommunicationEmails {
  invoiceLink: string;
  failedInvoiceLink: string;
  logo: string;
}

export interface IQuickBooks {
  clientKey: string;
  clientSecret: string;
  sandbox: boolean;
  debugging: boolean;
  callbackUrl: string;
  integrationToken: IToken;
  cmsUrl: string;
}

export interface IRedisConfig {
  host: string;
  port: string;
}

export interface ISentryConfig {
  dsn: string;
}

export interface SwiftcodesapiConfig {
  appKey: string;
}
export interface IFastForexConfig {
  apiKey: string;
}

export interface IAppConfig {
  useMongoDB: IMongoDB;
  dapi: IDapi;
  server: IServer;
  useAuth: IAuth;
  generatedTokenConfig: IGeneratedTokenConfig;
  organizationInvitationAuth: IOrganizationInvitationAuth;
  cmsUrls: ICmsUrls;
  pedant: IPedant;
  s3: IS3;
  sesLambdaHash: string;
  communicationEmails: ICommunicationEmails;
  quickbooks: IQuickBooks;
  redis?: IRedisConfig;
  sentry?: ISentryConfig;
  swiftcodesapi?: SwiftcodesapiConfig;
  fastForex?: IFastForexConfig;
}
