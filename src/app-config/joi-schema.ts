import Joi from 'joi';

export const JoiSchema = Joi.object({
  server: Joi.object({
    port: Joi.number().positive().greater(1024).required(),
    apiPrefix: Joi.string().required(),
    throttle: Joi.object({
      ttl: Joi.number().required(),
      limit: Joi.number().required(),
    }).required(),
    swagger: Joi.object({
      title: Joi.string().optional(),
      version: Joi.string().required(),
      description: Joi.string().optional(),
      tag: Joi.string().optional(),
      api: Joi.string().optional(),
    }).optional(),
  }),
  database: Joi.object({
    name: Joi.string().required(),
    dialect: Joi.string()
      .allow('mysql', 'postgres', 'sqlite', 'mariadb', 'mssql')
      .required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    autoLoadModels: Joi.boolean().required(),
    synchronize: Joi.boolean().required(),
    pool: Joi.object({
      min: Joi.number().min(1).optional(),
      max: Joi.number().max(10).optional(),
    }).optional(),
  }),
  generatedTokenConfig: Joi.object({
    registrationToken: Joi.object({
      secretKey: Joi.string().required(),
      expiration: Joi.string().required(),
    }),
    forgotPasswordToken: Joi.object({
      secretKey: Joi.string().required(),
      expiration: Joi.string().required(),
    }),
  }),
  cmsUrls: Joi.object({
    forgotPassword: Joi.string().required(),
    registrationInvitation: Joi.string().required(),
    acceptInvitation: Joi.string().required(),
  }),
  pedant: Joi.object({
    baseUrl: Joi.string().required(),
    uploadFileEndpoint: Joi.string().required(),
    authKey: Joi.string().required(),
  }),
  s3: Joi.object({
    bucket: Joi.string().required(),
    cloudFront: Joi.object({
      privateKey: Joi.string().optional(),
      domain: Joi.string().optional(),
      keyPairId: Joi.string().optional(),
    }).optional(),
  }),
});
