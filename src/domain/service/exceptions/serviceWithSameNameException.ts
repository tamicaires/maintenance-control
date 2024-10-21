import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/core/exceptions/appException';

export class ServiceWithSameNameException extends AppException {
  constructor() {
    super({
      message: 'Serviço já cadastrado',
      status: HttpStatus.CONFLICT,
    });
  }
}
