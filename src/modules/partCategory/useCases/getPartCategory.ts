import { Injectable } from "@nestjs/common";
import { PartCategoryRepository } from "../repositories/partCategoryRepository";
import { PartCategoryNotFoundException } from "../exceptions/PartCategoryNotFoundException";

@Injectable()
export class GetPartCategory {
  constructor(private readonly partRepository: PartCategoryRepository) { }

  async execute(partCategoryId: string) {
    const partCategory = await this.partRepository.findById(partCategoryId);
    if (!partCategory) {
      throw new PartCategoryNotFoundException();
    }

    return partCategory;
  }
}