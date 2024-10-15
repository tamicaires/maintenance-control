import { Injectable } from "@nestjs/common";
import { AxleRepository } from "../repositories/axleRepository";
import { AxleNotFoundException } from "../exceptions/AxleNotFoundException";
import { Axle } from "@prisma/client";

@Injectable()
export class GetAxle {
  constructor(private readonly axleRepository: AxleRepository) { }

  async execute(axleId: string): Promise<Axle | null> {
    const axle = await this.axleRepository.getById(axleId);
    if (!axle) {
      throw new AxleNotFoundException();
    }
    return axle;
  }
}