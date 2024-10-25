import { Injectable } from "@nestjs/common";
import { TAxle } from "../../../core/enum/axle.enum";
import { AxleRepository } from "../../../core/domain/repositories/axle-repository";
import { Axle } from "src/core/domain/entities/axle";

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