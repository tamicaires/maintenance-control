import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { PartRequestRepository } from "src/core/domain/repositories/part-request-repository";

@Injectable()
export class ListPartRequests {
  constructor(private readonly partRequestRepository: PartRequestRepository){}

  async execute(companyInstance: CompanyInstance){
    return this.partRequestRepository.list(companyInstance);
  }
}