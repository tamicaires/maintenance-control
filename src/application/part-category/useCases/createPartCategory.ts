import { Injectable } from "@nestjs/common";
import { PartCategoryRepository } from "../../../core/domain/repositories/part-category-repository";
import { PartCategory } from "../../../core/domain/entities/part-category";
import { PartCategoryAlreadyExistsException } from "../exceptions/PartCateogoryAlreadyExistsException";

interface CreatePartCategoryRequest {
  name: string;
  description: string | null;
}

@Injectable()
export class CreatePartCategory {
  constructor(private partCategoryRepository: PartCategoryRepository) { }

  async execute(category: CreatePartCategoryRequest): Promise<PartCategory> {
    const partCategoryAlreadyExists = await this.partCategoryRepository.findByName(category.name);
    if (partCategoryAlreadyExists) {
      throw new PartCategoryAlreadyExistsException();
    }

    const partCategory = new PartCategory(category);
    await this.partCategoryRepository.create(partCategory);
    return partCategory;
  }
}