import { Injectable } from "@nestjs/common";
import { TrailerRepository } from "../../../core/domain/repositories/trailer-repository";
import { TrailerNotFoundException } from "../exceptions/TrailerNotFoundException";
import { Trailer } from "../../../core/domain/entities/trailer";

@Injectable()
export class GetTrailer {
  constructor(private readonly trailerRepository: TrailerRepository) { }

  async execute(trailerId: string): Promise<Trailer | null> {
    const trailer = await this.trailerRepository.findById(trailerId);
    if (!trailer) {
      throw new TrailerNotFoundException();
    }

    return trailer;
  }
}