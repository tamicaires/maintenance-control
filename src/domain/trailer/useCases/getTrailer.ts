import { Injectable } from "@nestjs/common";
import { TrailerRepository } from "../repositories/trailerRepository";
import { TrailerNotFoundException } from "../exceptions/TrailerNotFoundException";
import { Trailer } from "../entities/Trailer";

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