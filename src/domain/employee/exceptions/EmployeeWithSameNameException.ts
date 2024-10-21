import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/core/exceptions/appException';

export class EmployeeWithSameNameException extends AppException {
  constructor() {
    super({
      message: 'Colaborador já cadastrado',
      status: HttpStatus.CONFLICT,
    });
  }
}
