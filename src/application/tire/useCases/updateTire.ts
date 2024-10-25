import { Injectable } from "@nestjs/common";
import { TireRepository } from "../../../core/domain/repositories/tire-repository";
import { TTireCondition, TTireLocation } from "../../../core/enum/tire.enum";
import { Tire } from "../../../core/domain/entities/tire";
import { TireNotFoundException } from "../exceptions/TireNotFoundException";
import { updateTireProperties } from "src/shared/utils/tireUtils";

interface UpdateTireRequest {
  brand?: string;
  serialNumber?: string;
  axleId?: string | null;
  status?: TTireCondition;
  treadDepth?: number | null;
  treadPattern?: string | null;
  wearRating?: number | null;
  fireNumber?: string | null;
  location?: TTireLocation;
}

@Injectable()
export class UpdateTire {
  constructor(private readonly tireRepository: TireRepository) { }

  async execute(tireId: string, tire: UpdateTireRequest): Promise<Tire> {
    const tireExists = await this.tireRepository.findById(tireId);
    if (!tireExists) {
      throw new TireNotFoundException();
    }

    updateTireProperties(tireExists, tire);
    await this.tireRepository.save(tireExists);
    return tireExists;
  }
}