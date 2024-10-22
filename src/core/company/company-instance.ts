import { Injectable } from "@nestjs/common";
import { CompanyNotFoundException } from "src/domain/company/exceptions/CompanyNotFoundException";
import { UserHasNoCompanyException } from "../exceptions/UserHasNoCompanyException";

@Injectable()
export class CompanyInstance {
  private companyId: string;

  private constructor(companyId: string) {
    if (!companyId) {
      throw new CompanyNotFoundException();
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
