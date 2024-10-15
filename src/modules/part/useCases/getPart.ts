import { Injectable } from "@nestjs/common";
import { Part } from "../entities/Part";
import { PartRepository } from "../repositories/partRepository";
import { PartNotFoundException } from "../exceptions/PartNotFoundExceptions";

@Injectable()
export class GetPart {
  constructor(private readonly partRepository: PartRepository) { }

  async execute(partId: string): Promise<Part> {
    const part = await this.partRepository.findById(partId);
    if (!part) {
      throw new PartNotFoundException();
    }

    return part;
  }
}