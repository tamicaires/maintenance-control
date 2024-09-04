import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

export class CarrierIdNotFoundException extends AppException {
  constructor() {
    super({
      message:
        'Transportadora não foi encontrada, cadastre sua frota com uma transportadora existente',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
