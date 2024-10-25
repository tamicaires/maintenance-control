import { Injectable } from "@nestjs/common";
import { TrailerRepository } from "../../../core/domain/repositories/trailer-repository";
import { CompanyInstance } from "src/core/company/company-instance";

@Injectable()
export class ListTrailers {
  constructor(private readonly trailerRepository: TrailerRepository) { }

  async execute(companyId: string) {
    const companyInstance = CompanyInstance.create(companyId);
    return await this.trailerRepository.list(companyInstance);
  }
}