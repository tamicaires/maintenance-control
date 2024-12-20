import { Injectable } from "@nestjs/common";
import { ChecklistTemplateRepository } from "src/core/domain/repositories/checklist/checklist-template-repository";
import { PrismaService } from "../prisma.service";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistTemplateItem } from "src/core/domain/entities/checklist/checklist-template/checklist-template-item";
import { ChecklistTemplate } from "src/core/domain/entities/checklist/checklist-template/checklist-template";

@Injectable()
export class PrismaChecklistTemplateRepository implements ChecklistTemplateRepository {
  constructor(private readonly _prisma: PrismaService) { }

  async create(companyInstance: CompanyInstance, template: ChecklistTemplate): Promise<ChecklistTemplate> {
    const checklistTemplate = await this._prisma.checklistTemplate.create({
      data: template
    })

    return checklistTemplate;
  }

  async findById(companyInstance: CompanyInstance, id: string): Promise<ChecklistTemplate | null> {
    const companyId = companyInstance.getCompanyId();

    const checklistTemplate = await this._prisma.checklistTemplate.findUnique({
      where: { id, companyId }
    })

    return checklistTemplate;
  }

  async list(companyInstance: CompanyInstance): Promise<ChecklistTemplate[]> {
    const companyId = companyInstance.getCompanyId();

    const checklistTemplates = await this._prisma.checklistTemplate.findMany({
      where: { companyId }
    })

    return checklistTemplates;
  }
}