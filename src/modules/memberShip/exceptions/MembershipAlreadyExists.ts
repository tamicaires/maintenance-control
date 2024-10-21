import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/core/exceptions/appException";

export class MembershipAlreadyExists extends AppException {
  constructor() {
    super({
      message: "Usuário Já pertence a empresa",
      status: HttpStatus.CONFLICT
    })
  }

}