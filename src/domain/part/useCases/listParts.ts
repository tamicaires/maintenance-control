import { Injectable } from "@nestjs/common";
import { PartRepository } from "../repositories/partRepository";
import { Part } from "../entities/Part";

@Injectable()
export class ListParts {
  constructor(private readonly partRepository: PartRepository) { }

  async execute(): Promise<Part[]> {
    return this.partRepository.list();
  }
}