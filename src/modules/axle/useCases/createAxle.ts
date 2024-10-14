import { Injectable } from "@nestjs/common";
import { Axle } from "../entities/axle";
import { TAxle } from "../enum/axle.enum";
import { AxleRepository } from "../repositories/axleRepository";

interface CreateAxleRequest {
  position: string;
  capacity: number | null;
  type: TAxle;
  trailerId: string;
}

@Injectable()
export class CreateAxle {
  constructor(private readonly axleRepository: AxleRepository) { }

  async execute({ capacity, position, trailerId, type }: CreateAxleRequest) {
    const axle = new Axle({
      capacity,
      position,
      trailerId,
      type
    })

    await this.axleRepository.create(axle);
    return axle;
  }
}