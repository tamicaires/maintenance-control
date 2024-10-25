import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/core/exceptions/appException';

export class ServiceAssignmentNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Designação de serviço não encontrada',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
