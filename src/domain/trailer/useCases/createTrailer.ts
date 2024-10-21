import { Injectable } from "@nestjs/common";
import { TrailerRepository } from "../repositories/trailerRepository";
import { TrailerAlreadyExistsException } from "../exceptions/TrailerAlrearyExistsException";
import { Trailer } from "../entities/Trailer";

interface CreateTrailerProps {
  plate: string;
  position: number;
  companyId: string;
  fleetId: string;
  isActive: boolean;
}

@Injectable()
export class CreateTrailer {
  constructor(private readonly trailerRepository: TrailerRepository) { }

  async execute({ plate, position, fleetId, isActive, companyId }: CreateTrailerProps): Promise<Trailer> {
    const trailerAlreadyExists = await this.trailerRepository.findByPlate(plate);
    if (trailerAlreadyExists) {
      throw new TrailerAlreadyExistsException();
    }

    const trailer = new Trailer({ 
      plate, 
      position, 
      fleetId, 
      isActive, 
      companyId 
    });
    await this.trailerRepository.create(trailer);

    return trailer
  }
}