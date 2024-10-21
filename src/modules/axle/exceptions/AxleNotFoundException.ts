import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/core/exceptions/appException";

export class AxleNotFoundException extends AppException {
  constructor() {
    super({
      message: "Eixo não encontrado",
      status: HttpStatus.NOT_FOUND
    })
  }
}