import { Injectable } from "@nestjs/common";
import { PartCategoryRepository } from "../repositories/partCategoryRepository";

@Injectable()
export class ListPartCategories {
  constructor(private readonly partCategoryRepository: PartCategoryRepository) { }
  async execute() {
    return await this.partCategoryRepository.list();
  }
}