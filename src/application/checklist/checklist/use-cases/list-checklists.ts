import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { Checklist } from "src/core/domain/entities/checklist/checklist";
import { ChecklistRepository } from "src/core/domain/repositories/checklist/checklist-repository";

@Injectable()
export class ListChecklists {
  constructor(private readonly _checklistRepository: ChecklistRepository) { }

  async execute(companyInstance: CompanyInstance): Promise<Checklist[]> {
    return await this._checklistRepository.list(companyInstance);
  }
}