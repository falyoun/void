import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { STRATEGY } from './strategy.enum';

@Injectable()
export class JwtGuard extends AuthGuard(STRATEGY.JWT) {
  private logger: Logger = new Logger('JwtGuard');

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // check if it is public route
    // You can throw an exception based on either "info" or "err" arguments
    this.logger.error(err);
    if (err || !user) {
      throw err || new UnauthorizedException(`${info}`);
    }
    return user;
  }
}
