import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/appException";

export class PartAlreadyExistsException extends AppException {
  constructor() {
    super({
      message: "Número de peça já cadastrado",
      status: HttpStatus.CONFLICT
    })
  }
}