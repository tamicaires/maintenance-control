import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/core/exceptions/appException';

export class CompanyWithSameNameException extends AppException {
  constructor() {
    super({
      message: 'Empresa já cadastrada',
      status: HttpStatus.CONFLICT,
    });
  }
}
