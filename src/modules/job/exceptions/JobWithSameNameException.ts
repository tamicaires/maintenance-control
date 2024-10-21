import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/core/exceptions/appException';

export class JobWithSameNameException extends AppException {
  constructor() {
    super({
      message: 'Cargo já cadastrado',
      status: HttpStatus.CONFLICT,
    });
  }
}
