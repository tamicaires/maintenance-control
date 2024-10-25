import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/core/exceptions/appException";

export class PartCategoryAlreadyExistsException extends AppException {
  constructor() {
    super({
      message: "Categoria de peça já existe",
      status: HttpStatus.CONFLICT
    })
  }
}