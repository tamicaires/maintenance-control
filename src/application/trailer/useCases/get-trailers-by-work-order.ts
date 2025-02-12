import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { Trailer } from "src/core/domain/entities/trailer";
import { TrailerRepository } from "src/core/domain/repositories/trailer-repository";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

@Injectable()
export class GetTrailersByWorkOrder {
  constructor(
    private readonly _workOrderRepository: WorkOrderRepository,
    private readonly _trailerRepository: TrailerRepository
  ) { }

  async execute(companyInstance: CompanyInstance, workOrderId: string): Promise<Trailer[]> {
    const workOrder = await this._workOrderRepository.findById(companyInstance, workOrderId);
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    const trailers = await this._trailerRepository.listByFleetId(companyInstance, workOrder.fleetId);
    if (!trailers) {
      throw new ExceptionHandler({
        message: "Nenhum reboque encontrado para esta ordem de serviço",
        status: HttpStatus.NOT_FOUND
      });
    }

    return trailers;
  }
}