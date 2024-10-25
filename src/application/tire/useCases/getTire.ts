import { Injectable } from "@nestjs/common";
import { TireRepository } from "../../../core/domain/repositories/tire-repository";
import { Tire } from "../../../core/domain/entities/tire";
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