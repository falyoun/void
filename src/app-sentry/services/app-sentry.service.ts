import { ArgumentsHost, Inject, Injectable } from '@nestjs/common';
import { AppSentryConstants } from '../constants';
import * as Sentry from '@sentry/node';
import { Scope } from '@sentry/node';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AppSentryOptions } from '../types/app-sentry-options';

@Injectable()
export class AppSentryService {
  constructor(
    @Inject(AppSentryConstants.APP_SENTRY_INSTANCE_TOKEN)
    private readonly sentryInstance: typeof Sentry,
    @Inject(AppSentryConstants.APP_SENTRY_MODULE_OPTIONS)
    private readonly options: AppSentryOptions,
  ) {}

  captureException(exception: any, host?: ArgumentsHost): void {
    this.sentryInstance.withScope((scope) =>
      this.captureHttpException(
        scope,
        host ? host.switchToHttp() : null,
        exception,
      ),
    );
  }
  captureEvent(event: Sentry.Event) {
    this.sentryInstance.withScope((scope) =>
      this.captureSentryEvent(scope, event),
    );
  }

  private captureSentryEvent(scope: Scope, event: Sentry.Event): void {
    // try to parse Request if it was supplied to the event
    this.enrichSentryEvent(scope, event.request);
    this.sentryInstance.captureEvent(event);
  }

  private captureHttpException(
    scope: Scope,
    http: HttpArgumentsHost,
    exception: any,
  ): void {
    this.enrichSentryEvent(scope, http ? http.getRequest() : null);
    this.sentryInstance.captureException(exception);
  }

  private enrichSentryEvent(scope: any, request: any) {
    if (request) {
      const data = Sentry.Handlers.parseRequest({}, request, {
        request: true,
        user: true,
      });
      scope.setExtra('req', data.request);
      scope.setExtras(data.extra);
      if (data.user) {
        scope.setUser(data.user);
      }
    }

    if (this.options.tags) {
      scope.setTags(this.options.tags);
    }
  }
}
