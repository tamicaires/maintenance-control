import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/core/exceptions/appException';

export class CompanyNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Empresa não encontrada',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
