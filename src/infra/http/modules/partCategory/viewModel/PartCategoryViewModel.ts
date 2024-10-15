import { PartCategory } from "src/modules/partCategory/entities/partCategory";

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