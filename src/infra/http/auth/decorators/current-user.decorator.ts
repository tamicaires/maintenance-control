import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequestModel } from '../models/authRequestModel';
import { User } from 'src/core/domain/entities/user';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequestModel>();

    return request.user;
  },
);
