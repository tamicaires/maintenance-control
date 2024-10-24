import { AppException } from "./appException";

interface ExceptionProps {
  message: string;
  status: number;
}

export class ExceptionHandler extends AppException {
  constructor({ message, status }: ExceptionProps) {
    super({
      message: message,
      status: status
    })
  }
}