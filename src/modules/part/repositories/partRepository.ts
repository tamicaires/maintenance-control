import { Part } from "../entities/Part";

export abstract class PartRepository {
  abstract create(part: Part): Promise<void>;
  abstract findByPartnumber(partNumber: string): Promise<Part | null>;
  abstract findById(id: string): Promise<Part | null>;
  abstract list(): Promise<Part[]>;
}