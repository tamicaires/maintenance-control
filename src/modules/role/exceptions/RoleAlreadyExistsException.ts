import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class RoleAlreadyExistsException extends AppException {
  constructor() {
    super({
      message: 'Role já cadastrado',
      status: HttpStatus.CONFLICT,
    });
  }
}
