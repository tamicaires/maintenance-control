import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class JobNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Cargo não encontrado',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
