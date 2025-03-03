import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { BoxRepository } from "src/core/domain/repositories/box-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { IUseCase } from "src/shared/protocols/use-case";

@Injectable()
export class DeleteBox implements IUseCase<string, void> {
  constructor(
    private readonly boxRepository: BoxRepository
  ) { }

  async execute(companyInstance: CompanyInstance, boxId: string): Promise<void> {
    const box = await this.boxRepository.findById(companyInstance, boxId);

    if (!box) {
      throw new ExceptionHandler({
        message: "Box não encontrado",
        status: HttpStatus.NOT_FOUND
      })
    }

    await this.boxRepository.delete(companyInstance, boxId);
  }
}