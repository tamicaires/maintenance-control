import { Injectable } from "@nestjs/common";
import { Part } from "../../../core/domain/entities/part";
import { PartRepository } from "../../../core/domain/repositories/part-repository";
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