import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class JobWithSameNameException extends AppException {
  constructor() {
    super({
      message: 'Cargo já cadastrado',
      status: HttpStatus.CONFLICT,
    });
  }
}
