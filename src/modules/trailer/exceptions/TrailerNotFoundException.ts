import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/appException";

export class TrailerNotFoundException extends AppException {
  constructor() {
    super({
      message: "Reboque não encontrado",
      status: HttpStatus.NOT_FOUND,
    });
  }
}