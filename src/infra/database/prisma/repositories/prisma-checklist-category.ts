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
      data: checklistCategory
    })

    return checklistCategory;
  }

  async findByName(companyInstance: CompanyInstance, name: string): Promise<ChecklistCategory | null> {
    const companyId = companyInstance.getCompanyId();

    const checklistCategory = await this._prisma.checklistCategory.findFirst({
      where: {
        name,
        companyId,
      }
    });

    if (!checklistCategory) {
      return null;
    }

    return checklistCategory;
  }

  async findById(companyInstance: CompanyInstance, id: string): Promise<ChecklistCategory | null> {
    const companyId = companyInstance.getCompanyId();

    const checklistCategory = await this._prisma.checklistCategory.findUnique({
      where: { id, companyId }
    });

    if (!checklistCategory) {
      return null;
    }

    return checklistCategory;
  }

  async findAll(companyInstance: CompanyInstance): Promise<ChecklistCategory[]> {
    const companyId = companyInstance.getCompanyId();

    const checklistCategories = await this._prisma.checklistCategory.findMany({
      where: { companyId }
    })

    return checklistCategories;
  }

  async delete(companyInstance: CompanyInstance, id: string): Promise<void> {
    const companyId = companyInstance.getCompanyId();

    await this._prisma.checklistCategory.delete({
      where: { id, companyId }
    });
  }
}