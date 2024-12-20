import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ChecklistCategory } from "src/core/domain/entities/checklist/checklist-category";
import { ChecklistCategoryRepository } from "src/core/domain/repositories/checklist/checklist-category-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

interface CreateChecklistCategoryRequest {
  name: string;
  description: string | null;
}

@Injectable()
export class CreateChecklistCategory {
  constructor(private readonly _checklistRepository: ChecklistCategoryRepository) { }

  async execute(companyInstance: CompanyInstance, data: CreateChecklistCategoryRequest) {
    const checklistCategoryExists = await this._checklistRepository.findByName(
      companyInstance,
      data.name
    )
    if (checklistCategoryExists) {
      throw new ExceptionHandler({
        message: "Categoria de checklist já existe",
        status: HttpStatus.CONFLICT
      })
    }

    const checklistCategory = new ChecklistCategory({
      name: data.name,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const createdChecklistCategory = await this._checklistRepository.create(
      companyInstance,
      checklistCategory
    );

    return createdChecklistCategory;
  }
}