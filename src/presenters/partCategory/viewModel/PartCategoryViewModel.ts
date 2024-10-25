import { PartCategory } from "src/core/domain/entities/part-category";

export class PartCategoryViewModel {
  static toHttp(partCategory: PartCategory) {
    return {
      id: partCategory.id,
      name: partCategory.name,
      description: partCategory.description,
      createdAt: partCategory.createdAt,
      updatedAt: partCategory.updatedAt,
    };
  }
}