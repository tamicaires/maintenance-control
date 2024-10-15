import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/appException";

export class TireAlreadyExistsException extends AppException {
  constructor() {
    super({
      message: "Pneu já cadastrado",
      status: HttpStatus.CONFLICT
    })
  }
}