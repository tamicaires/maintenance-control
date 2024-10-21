import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/core/exceptions/appException';

export class AuthValuesIncorretException extends AppException {
  constructor() {
    super({
      message: 'Email ou senha incorretos',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
