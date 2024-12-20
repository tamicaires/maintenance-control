import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistCategory } from "src/core/domain/entities/checklist/checklist-category";
import { ChecklistCategoryRepository } from "src/core/domain/repositories/checklist/checklist-category-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

@Injectable()
export class GetChecklistCategoryById {
  constructor(
    private readonly checklistCategoryRepository: ChecklistCategoryRepository
  ) { }

  async execute(companyInstance: CompanyInstance, checklistCategoryId: string): Promise<ChecklistCategory> {
    const checklistCategory = await this.checklistCategoryRepository.findById(
      companyInstance,
      checklistCategoryId
    );

    if (!checklistCategory) {
      throw new ExceptionHandler({
        message: "Categoria de checklist não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    return checklistCategory;
  }
}