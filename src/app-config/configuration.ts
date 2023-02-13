import { generateAppConfigFactory } from './app-config-factory';
import { extendDeep } from './config-utils';

const EnvConfig = {
  development: generateAppConfigFactory('../config/development.yaml'),
  demo: generateAppConfigFactory('../config/demo.yaml'),
  staging: generateAppConfigFactory('../config/staging.yaml'),
  production: generateAppConfigFactory('../config/production.yaml'),
  'api-test': generateAppConfigFactory('../config/api-test.yaml'),
  uat: generateAppConfigFactory('../config/uat.yaml'),
};
const config = {
  ...EnvConfig[/*process.env.NODE_ENV || */ 'development'](),
};
let commandLineConfig = {};
if (process.env.NODE_CONFIG) {
  try {
    commandLineConfig = JSON.parse(process.env.NODE_CONFIG);
  } catch (e) {
    console.error('The $NODE_CONFIG environment variable is malformed JSON');
  }
  extendDeep(config, commandLineConfig);
}
export const configurationFactory = () => config;
