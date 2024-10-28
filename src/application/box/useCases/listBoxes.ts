import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { BoxRepository } from "src/core/domain/repositories/box-repository";

@Injectable()
export class ListBoxes {
  constructor(private readonly boxRepository: BoxRepository) { }

  async execute(companyInstante: CompanyInstance) {
    return await this.boxRepository.list(companyInstante);
  }
} 