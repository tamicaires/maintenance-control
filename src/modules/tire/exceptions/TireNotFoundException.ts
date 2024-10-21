import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/core/exceptions/appException";

export class TireNotFoundException extends AppException {
  constructor() {
    super({
      message: "Pneu não encontrado",
      status: HttpStatus.NOT_FOUND
    });
  }
}