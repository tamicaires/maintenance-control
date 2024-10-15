import { Injectable } from "@nestjs/common";
import { TireRepository } from "../repositories/TireRepository";
import { Tire } from "../entities/Tire";
import { TireNotFoundException } from "../exceptions/TireNotFoundException";

@Injectable()
export class GetTire {
  constructor(private readonly tireRepository: TireRepository) { }

  async execute(tireId: string): Promise<Tire> {
    const tire = await this.tireRepository.findById(tireId);
    if (!tire) {
      throw new TireNotFoundException();
    }

    return tire;
  }
}