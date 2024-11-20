import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { PartRequestRepository } from "src/core/domain/repositories/part-request-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

@Injectable()
export class GetPartRequestById {
  constructor(private readonly partRequestRepository: PartRequestRepository) { }

  async execute(companyInstance: CompanyInstance, id: string) {
    const partRequest = await this.partRequestRepository.findById(companyInstance, id);
    if (!partRequest) {
      throw new ExceptionHandler({
        message: "Solicitação de peça não encontrada",
        status: 404
      })
    }

    return partRequest;
  }
}