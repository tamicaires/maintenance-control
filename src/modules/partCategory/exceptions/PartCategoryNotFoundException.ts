import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/appException";

export class PartCategoryNotFoundException extends AppException {
  constructor() {
    super({
      message: "Categoria não foi encontrada",
      status: HttpStatus.NOT_FOUND,
    })
  }
}