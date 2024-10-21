import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/core/exceptions/appException';

export class EmployeeNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Colaborador não encontrado',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
