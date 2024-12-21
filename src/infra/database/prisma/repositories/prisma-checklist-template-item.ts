import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistTemplateItem } from "src/core/domain/entities/checklist/checklist-template/checklist-template-item";
import { ChecklistTemplateItemRepository } from "src/core/domain/repositories/checklist/checklist-template-item-repository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaChecklistTemplateItemRepository implements ChecklistTemplateItemRepository {
  constructor(private readonly _prisma: PrismaService) { }

  async create(companyInstance: CompanyInstance, templateItem: ChecklistTemplateItem): Promise<ChecklistTemplateItem> {
    const checklistTemplateItem = await this._prisma.checklistItemTemplate.create({
      data: templateItem
    });

    return checklistTemplateItem;
  }

  async findById(companyInstance: CompanyInstance, id: string): Promise<ChecklistTemplateItem | null> {
    const companyId = companyInstance.getCompanyId();

    const checklistTemplateItem = await this._prisma.checklistItemTemplate.findUnique({
      where: {
        id,
        template: {
          companyId
        }
      }
    });

    return checklistTemplateItem;
  }

  async list(companyInstance: CompanyInstance): Promise<ChecklistTemplateItem[]> {
    const companyId = companyInstance.getCompanyId();

    const checklistTemplateItems = await this._prisma.checklistItemTemplate.findMany({
      where: {
        template: {
          companyId
        }
      }
    });

    return checklistTemplateItems;
  }
}