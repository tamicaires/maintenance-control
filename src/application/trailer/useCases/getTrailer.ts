import { Injectable } from "@nestjs/common";
import { TrailerRepository } from "../../../core/domain/repositories/trailer-repository";
import { TrailerNotFoundException } from "../exceptions/TrailerNotFoundException";
import { Trailer } from "src/core/domain/entities/trailer";
import { ITrailerWithRelationalData } from "src/shared/types/trailer-with-relational-data";
import { IUseCase } from "src/shared/protocols/use-case";
import { CompanyInstance } from "src/core/company/company-instance";

@Injectable()
export class GetTrailer implements IUseCase<string, ITrailerWithRelationalData | null> {
  constructor(private readonly trailerRepository: TrailerRepository) { }

  async execute(companyInstance: CompanyInstance, trailerId: string): Promise<ITrailerWithRelationalData | null> {
    const trailer = await this.trailerRepository.findById(companyInstance, trailerId);
    if (!trailer) {
      throw new TrailerNotFoundException();
    }

    return trailer;
  }
}