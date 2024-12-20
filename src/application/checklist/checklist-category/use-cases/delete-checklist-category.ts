import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistCategoryRepository } from "src/core/domain/repositories/checklist/checklist-category-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

@Injectable()
export class DeleteChecklistCategory {
  constructor(private readonly _checklistCategoryRepository: ChecklistCategoryRepository) { }

  async execute(companyInstance: CompanyInstance, id: string): Promise<void> {
    const checklistCategory = await this._checklistCategoryRepository.findById(companyInstance, id);
    if (!checklistCategory) {
      throw new ExceptionHandler({
        message: "Categoria de checklist não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    await this._checklistCategoryRepository.delete(companyInstance, id);
  }
}