import { HttpStatus, Injectable } from "@nestjs/common";
import { TrailerRepository } from "../../../core/domain/repositories/trailer-repository";
import { TrailerAlreadyExistsException } from "../exceptions/TrailerAlrearyExistsException";
// import { Trailer } from "../../../core/domain/entities/trailer";
import { CompanyInstance } from "src/core/company/company-instance";
import { IUseCase } from "src/shared/protocols/use-case";
import { Trailer } from "src/core/domain/entities/trailer";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

interface IRequest {
  plate: string;
  position: number | null;
  fleetId: string | null;
  isActive: boolean;
}

@Injectable()
export class CreateTrailer implements IUseCase<IRequest, Trailer> {
  constructor(private readonly trailerRepository: TrailerRepository) { }

  async execute(companyInstance: CompanyInstance, data: IRequest): Promise<Trailer> {
    const trailerAlreadyExists = await this.trailerRepository.findByPlate(data.plate);
    if (trailerAlreadyExists) {
      throw new ExceptionHandler({
        message: "Reboque já cadastrado",
        status: HttpStatus.CONFLICT
      })
    }

    const trailer = new Trailer(
      companyInstance.addCompanyFilter(data)
    );
    await this.trailerRepository.create(trailer);

    return trailer
  }
}