import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/core/exceptions/appException';

export class InvalidDateException extends AppException {
  constructor() {
    super({
      message: `Data inválida, verifique os dados enviados`,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
