import { HttpStatus } from '@nestjs/common';
import { AppException } from './appException';

export class ForbiddenUserRoleException extends AppException {
  constructor() {
    super({
      message: 'Você não tem permissão para realizar esta ação ou não está vinculado',
      status: HttpStatus.FORBIDDEN,
    });
  }
}
