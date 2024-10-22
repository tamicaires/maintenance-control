import { Injectable } from "@nestjs/common";
import { TrailerRepository } from "../repositories/trailerRepository";
import { TrailerAlreadyExistsException } from "../exceptions/TrailerAlrearyExistsException";
import { Trailer } from "../entities/Trailer";
import { CompanyInstance } from "src/core/company/company-instance";

interface CreateTrailerProps {
  plate: string;
  position: number | null;
  fleetId: string | null;
  isActive: boolean;
}

@Injectable()
export class CreateTrailer {
  constructor(private readonly trailerRepository: TrailerRepository) { }

  async execute(companyInstance: CompanyInstance, data: CreateTrailerProps): Promise<Trailer> {
    const trailerAlreadyExists = await this.trailerRepository.findByPlate(data.plate);
    if (trailerAlreadyExists) {
      throw new TrailerAlreadyExistsException();
    }
    console.log("Creating trailer ", companyInstance.getCompanyId());
    const trailer = new Trailer(
      companyInstance.addCompanyFilter(data)
    );
    await this.trailerRepository.create(trailer);

    return trailer
  }
}