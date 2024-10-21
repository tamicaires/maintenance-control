import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/core/exceptions/appException";

export class TrailerAlreadyExistsException extends AppException {
  constructor() {
    super({
      message: "Reboque já cadastrado",
      status: HttpStatus.CONFLICT
    });
  }
}