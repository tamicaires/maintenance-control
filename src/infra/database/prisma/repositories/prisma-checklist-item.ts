import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistItem } from "src/core/domain/entities/checklist/checklist-item";
import { ChecklistItemRepository } from "src/core/domain/repositories/checklist/checklist-item-repository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaChecklistItemRepository implements ChecklistItemRepository {
  constructor(private readonly _prisma: PrismaService) { }

  async create(companyInstance: CompanyInstance, item: ChecklistItem): Promise<ChecklistItem> {
    const checklistItem = await this._prisma.checklistItem.create({
      data: item
    });

    return checklistItem;
  }

  async findById(companyInstance: CompanyInstance, id: string): Promise<ChecklistItem | null> {
    const checklistItem = await this._prisma.checklistItem.findUnique({
      where: {
        id,
        checklist: {
          template: {
            companyId: companyInstance.getCompanyId()
          }
        }
      }
    });

    return checklistItem;
  }

  async findByChecklistId(companyInstance: CompanyInstance, checklistId: string): Promise<ChecklistItem[]> {
    const checklistItems = await this._prisma.checklistItem.findMany({
      where: {
        checklistId,
        checklist: {
          template: {
            companyId: companyInstance.getCompanyId()
          }
        }
      }

    })

    return checklistItems;
  }
}