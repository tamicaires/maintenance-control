import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { Box } from "src/core/domain/entities/box";
import { BoxRepository } from "src/core/domain/repositories/box-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

interface CreateBoxRequest {
  name: string;
  description: string | null;
  isActive: boolean;
}

@Injectable()
export class CreateBox {
  constructor(private readonly boxRepository: BoxRepository) { }

  async execute(companyInstance: CompanyInstance, data: CreateBoxRequest): Promise<Box> {
    const boxExists = await this.boxRepository.findByName(companyInstance, data.name);
    if (boxExists) {
      throw new ExceptionHandler({
        message: "Identificação de box já cadastrada",
        status: HttpStatus.CONFLICT
      })
    }

    const box = new Box(companyInstance.addCompanyFilter(data))

    await this.boxRepository.create(companyInstance, box);
    return box;
  }
}