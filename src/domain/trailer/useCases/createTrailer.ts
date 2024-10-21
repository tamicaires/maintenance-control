import { Injectable } from "@nestjs/common";
import { TrailerRepository } from "../repositories/trailerRepository";
import { TrailerAlreadyExistsException } from "../exceptions/TrailerAlrearyExistsException";
import { Trailer } from "../entities/Trailer";
import { CompanyInstance } from "src/core/company/company-instance";

interface CreateTrailerProps {
  plate: string;
  position: number;
  companyId: string;
  fleetId: string | null;
  isActive: boolean;
}

@Injectable()
export class CreateTrailer {
  constructor(private readonly trailerRepository: TrailerRepository) { }

  async execute({ plate, position, fleetId, isActive, companyId }: CreateTrailerProps): Promise<Trailer> {
    const companyInstance = new CompanyInstance(companyId);

    const trailerAlreadyExists = await this.trailerRepository.findByPlate(plate);
    if (trailerAlreadyExists) {
      throw new TrailerAlreadyExistsException();
    }
    console.log("Creating trailer ", companyInstance.getCompanyId() );
    const trailer = new Trailer({ 
      plate, 
      position, 
      fleetId, 
      isActive, 
      companyId: companyInstance.getCompanyId() 
    });
    await this.trailerRepository.create(trailer);

    return trailer
  }
}