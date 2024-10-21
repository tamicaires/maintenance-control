import { HttpStatus } from "@nestjs/common";
import { AppException } from "./appException";

export class UserHasNoCompanyException extends AppException {
  constructor() {
    super({
      message: 'Usuário não possui vinculo com a empresa',
      status: HttpStatus.FORBIDDEN,
    });
  }
}