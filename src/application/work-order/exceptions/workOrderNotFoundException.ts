import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/core/exceptions/appException';

export class WorkOrderNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Ordem de serviço não encontrada',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
