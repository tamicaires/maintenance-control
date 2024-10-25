import { HttpStatus, Injectable } from "@nestjs/common";
import { UserHasNoCompanyException } from "../exceptions/UserHasNoCompanyException";
import { ExceptionHandler } from "../exceptions/ExceptionHandler";

@Injectable()
export class CompanyInstance {
  private companyId: string;

  private constructor(companyId: string) {
    if (!companyId) {
      throw new ExceptionHandler({
        message: "Empresa não informada",
        status: HttpStatus.NOT_FOUND
      })
    }
    this.companyId = companyId;
  }

  static create(companyId: string): CompanyInstance {
    return new CompanyInstance(companyId);
  }

  getCompanyId(): string {
    return this.companyId;
  }

  validateCompanyAccess(requiredCompanyId: string): boolean {
    if (this.companyId !== requiredCompanyId) {
      throw new UserHasNoCompanyException();
    }
    return true;
  }

  addCompanyFilter<T>(data: T): T & { companyId: string } {
    return {
      ...data,
      companyId: this.companyId,
    };
  }
}
