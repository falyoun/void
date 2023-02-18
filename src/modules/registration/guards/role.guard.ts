import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '@prisma/client';

export const RoleGuard = (roles: Role[]): Type<CanActivate> => {
  class RoleGuardMixin extends AuthGuard() {
    getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    }
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = this.getRequest(context);
      const user = request.user;
      return roles.includes(user.role.name);
    }
  }

  return mixin(RoleGuardMixin);
};
