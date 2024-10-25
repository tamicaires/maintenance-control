import { Injectable } from "@nestjs/common";
import { PartRepository } from "../../../core/domain/repositories/part-repository";
import { Part } from "../../../core/domain/entities/part";

@Injectable()
export class ListParts {
  constructor(private readonly partRepository: PartRepository) { }

  async execute(): Promise<Part[]> {
    return this.partRepository.list();
  }
}