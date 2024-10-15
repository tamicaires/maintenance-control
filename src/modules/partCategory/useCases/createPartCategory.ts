import { Injectable } from "@nestjs/common";
import { PartCategoryRepository } from "../repositories/partCategoryRepository";
import { PartCategory } from "../entities/partCategory";
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