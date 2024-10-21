import { Injectable } from "@nestjs/common";
import { PartRepository } from "../repositories/partRepository";
import { TPartLocation, TPartStatus } from "../../../core/enum/part.enum";
import { PartNotFoundException } from "../exceptions/PartNotFoundExceptions";
import { updatePartProperties } from "src/utils/partUtils";

interface UpdatePartRequest {
  name?: string;
  description?: string | null;
  partNumber?: string;
  model?: string | null;
  brand?: string | null;
  supplier?: string | null;
  costPrice?: number;
  sellingPrice?: number | null;
  stockQuantity?: number;
  location?: TPartLocation;
  status?: TPartStatus;
  categoryId?: string;
  trailerId?: string | null;
  axleId?: string | null;
}

@Injectable()
export class UpdatePart {
  constructor(private readonly partRepository: PartRepository) { }

  async execute(partId: string, data: UpdatePartRequest) {
    const part = await this.partRepository.findById(partId);
    if (!part) throw new PartNotFoundException();

    updatePartProperties(part, data);

    await this.partRepository.save(part);

    return part;
  }
}
