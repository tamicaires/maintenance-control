import { HttpStatus } from "@nestjs/common";
import { AppException, AppExceptionProps } from "src/core/exceptions/appException";

interface IncorrectValuesExceptionProps {
  fields: AppExceptionProps['fields'];
}


export class FleetAlreadyExistsException extends AppException {
  constructor({ fields }: IncorrectValuesExceptionProps) {
    super({
      message: "Não foi possivel cadastrar",
      status: HttpStatus.CONFLICT,
      fields: fields
    });
  }
}