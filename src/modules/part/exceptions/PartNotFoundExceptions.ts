import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/appException";

export class PartNotFoundException extends AppException {
  constructor() {
    super({
      message: "Peça não encontrada",
      status: HttpStatus.NOT_FOUND
    })
  }
}