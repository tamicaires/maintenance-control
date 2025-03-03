import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { IUseCase } from "src/shared/protocols/use-case";

@Injectable()
export class DeleteChecklistTemplate implements IUseCase<string, void> {
  constructor(private readonl) { }

  async execute(companyInstance: CompanyInstance, templateId: string): Promise<void> { }
}