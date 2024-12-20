import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistTemplate } from "src/core/domain/entities/checklist/checklist-template/checklist-template";
import { ChecklistTemplateRepository } from "src/core/domain/repositories/checklist/checklist-template-repository";

interface IRequest {
  name: string;
  icon: string | null;
}

@Injectable()
export class CreateChecklistTemplate {
  constructor(private readonly _checklistTemplateRepository: ChecklistTemplateRepository) { }

  async execute(companyInstance: CompanyInstance, template: IRequest) {
    const templateToCreate = new ChecklistTemplate({
      name: template.name,
      icon: template.icon,
      companyId: companyInstance.getCompanyId(),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const checklistTemplate = await this._checklistTemplateRepository.create(
      companyInstance,
      templateToCreate
    );

    return checklistTemplate;
  }
}