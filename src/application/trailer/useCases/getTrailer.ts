import { Injectable } from "@nestjs/common";
import { TrailerRepository } from "../../../core/domain/repositories/trailer-repository";
import { TrailerNotFoundException } from "../exceptions/TrailerNotFoundException";
import { IUseCase } from "src/shared/protocols/use-case";
import { CompanyInstance } from "src/core/company/company-instance";
import { ITrailerWithRelationalData } from "src/shared/types/part-request/trailer.type";

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