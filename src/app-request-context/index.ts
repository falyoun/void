import contextService from 'request-context';
import { INestApplication } from '@nestjs/common';
export const VOID_REQUEST_NAMESPACE = 'void_request_context';
export const AppRequestContextDataKeys = {
  IN_CONTEXT_REQUEST_USER: 'in_context_request_user',
  IN_CONTEXT_REQUEST_ORGANIZATION: 'in_context_request_organization',
};
export class AppRequestContext {
  wrapNestApplication(
    app: INestApplication,
    namespace: string = VOID_REQUEST_NAMESPACE,
  ) {
    app.use(contextService.middleware(namespace));
  }
  setValue(
    key: string,
    value: any,
    delimiter = ':',
    namespace = VOID_REQUEST_NAMESPACE,
  ) {
    contextService.set(`${namespace}${delimiter}${key}`, value);
  }
  getValue(
    key: string,
    delimiter = ':',
    namespace = VOID_REQUEST_NAMESPACE,
  ): any {
    return contextService.get(`${namespace}${delimiter}${key}`);
  }
}
export const appRequestContextInstance = new AppRequestContext();
