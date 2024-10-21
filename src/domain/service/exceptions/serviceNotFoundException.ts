import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/core/exceptions/appException';

export class ServiceNotFoundExcetion extends AppException {
  constructor() {
    super({
      message: 'Serviço não encontrado',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
