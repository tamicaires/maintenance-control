import { CompanyInstance } from "src/core/company/company-instance";

export interface IUseCase<PARAMS, ENTITY> {
  execute: (companyInstance: CompanyInstance, data: PARAMS) => Promise<ENTITY>;
}
