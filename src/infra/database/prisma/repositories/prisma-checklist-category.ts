import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistCategory, ChecklistCategoryType } from "src/core/domain/entities/checklist/checklist-category";
import { ChecklistCategoryRepository } from "src/core/domain/repositories/checklist/checklist-category-repository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaChecklistCategoryRepository implements ChecklistCategoryRepository {
  constructor(private readonly _prisma: PrismaService) { }

  async create(companyInstance: CompanyInstance, checklistCategory: ChecklistCategory): Promise<ChecklistCategory> {
    await this._prisma.checklistCategory.create({
      data: {
        id: checklistCategory.id,
        name: checklistCategory.name,
        description: checklistCategory.description,
        createdAt: checklistCategory.createdAt,
        updatedAt: checklistCategory.updatedAt
      }
    })

    return checklistCategory;
  }

  async findByName(companyInstance: CompanyInstance, name: string): Promise<ChecklistCategory | null> {
    const checklistCategory = await this._prisma.checklistCategory.findFirst({
      where: {
        name
      }
    });

    if (!checklistCategory) {
      return null;
    }

    return checklistCategory;
  }
  findById(companyInstance: CompanyInstance, id: string): Promise<ChecklistCategoryType> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<ChecklistCategoryType[]> {
    throw new Error("Method not implemented.");
  }
}