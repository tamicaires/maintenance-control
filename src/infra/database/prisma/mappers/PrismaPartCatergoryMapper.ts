import { PartCategory as PartCategoryRaw } from '@prisma/client';
import { PartCategory } from 'src/core/domain/entities/part-category';

export class PrismaPartCategoryMapper {
  static toPrisma(partCategory: PartCategory): PartCategoryRaw {
    return {
      id: partCategory.id,
      name: partCategory.name,
      description: partCategory.description,
      createdAt: partCategory.createdAt,
      updatedAt: partCategory.updatedAt,
    };
  }

  static toDomain(partCategory: PartCategoryRaw): PartCategory {
    return new PartCategory(
      {
        name: partCategory.name,
        description: partCategory.description,
        createdAt: partCategory.createdAt,
        updatedAt: partCategory.updatedAt,
      },
      partCategory.id,
    );
  }
}
