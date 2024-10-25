import { Injectable } from "@nestjs/common";
import { TTireCondition, TTireLocation } from "../../../core/enum/tire.enum";
import { Tire } from "../../../core/domain/entities/tire";
import { TireRepository } from "../../../core/domain/repositories/tire-repository";
import { TireAlreadyExistsException } from "../exceptions/TireAlreadyExistsException";

interface CreateTireRequest {
  brand: string;
  serialNumber: string;
  axleId: string | null;
  status: TTireCondition;
  treadDepth: number | null;
  treadPattern: string | null;
  wearRating: number | null;
  fireNumber: string | null;
  location: TTireLocation;
}

@Injectable()
export class CreateTire {
  constructor(private readonly tireRepository: TireRepository) { }

  async execute(tire: CreateTireRequest): Promise<Tire> {
    const tireAlreadyExists = await this.tireRepository.findBySerialNumber(
      tire.serialNumber
    );
    if (tireAlreadyExists) {
      throw new TireAlreadyExistsException();
    }

    const newTire = new Tire(tire);
    await this.tireRepository.create(newTire);
    return newTire;
  }
}