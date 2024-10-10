import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class RoleNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Role/Cargo não encontrado',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
