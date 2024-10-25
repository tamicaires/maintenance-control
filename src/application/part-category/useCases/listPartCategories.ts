import { Injectable } from "@nestjs/common";
import { PartCategoryRepository } from "../../../core/domain/repositories/part-category-repository";

@Injectable()
export class ListPartCategories {
  constructor(private readonly partCategoryRepository: PartCategoryRepository) { }
  async execute() {
    return await this.partCategoryRepository.list();
  }
}