import type { PipeTransform } from '@nestjs/common';
import {
  applyDecorators,
  Param,
  ParseUUIDPipe,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import type { Type } from '@nestjs/common/interfaces';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthGuard } from '../guards/auth.guard';
import type { UserRoleType } from '../constants';
import { UserRolesGuard } from '../guards/roles.guard';
import { AuthUserInterceptor } from '../interceptors/auth-user-interceptor.service';
import { PublicRoute } from './public-route.decorator';

/**
 * Calling multiple features related to authorization.
 * @param roles Array of [UserRoleType](../constants/user-role.ts) representing roles required to access endpoint
 * @param options (Optional) Set { public: true } if route is public
 */
export function Auth(
  requiredRole: UserRoleType,
  options?: Partial<{ public: boolean }>,
): MethodDecorator {
  // console.log('Auth');
  const isPublicRoute = options?.public;

  return applyDecorators(
    SetMetadata('requiredRole', requiredRole),
    UseGuards(AuthGuard({ public: isPublicRoute }), UserRolesGuard),
    ApiBearerAuth(),
    UseInterceptors(AuthUserInterceptor),
    ApiUnauthorizedResponse({
      description: 'You must login to access this resource',
    }),
    PublicRoute(isPublicRoute),
  );
}

export function UUIDParam(
  property: string,
  ...pipes: Array<Type<PipeTransform> | PipeTransform>
): ParameterDecorator {
  return Param(property, new ParseUUIDPipe({ version: '4' }), ...pipes);
}
