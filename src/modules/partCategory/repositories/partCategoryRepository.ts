import { PartCategory } from "../entities/partCategory";

export abstract class PartCategoryRepository {
  abstract create(partCategory: PartCategory): Promise<void>;
  abstract findByName(name: string): Promise<PartCategory | null>;
}