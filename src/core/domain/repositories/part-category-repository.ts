import { PartCategory } from "../entities/part-category";

export abstract class PartCategoryRepository {
  abstract create(partCategory: PartCategory): Promise<void>;
  abstract findByName(name: string): Promise<PartCategory | null>;
  abstract findById(id: string): Promise<PartCategory | null>;
  abstract list(): Promise<PartCategory[]>;
}