import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { ContextProvider } from '../providers';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    // console.log('AuthUserInterceptor');
    const request = context.switchToHttp().getRequest();

    const user = <any>request.user;
    // console.log(user);
    ContextProvider.setAuthUser(user);
    // console.log('AuthUserInterceptor');

    return next.handle();
  }
}
