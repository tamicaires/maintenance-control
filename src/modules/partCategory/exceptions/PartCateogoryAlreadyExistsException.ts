import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/appException";

export class PartCategoryAlreadyExistsException extends AppException {
  constructor() {
    super({
      message: "Categoria de peça já existe",
      status: HttpStatus.CONFLICT
    })
  }
}