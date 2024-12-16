import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { MaintenanceStatus } from "src/core/enum/maitenance-status.enum";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { IFinishWaitingParts } from "src/shared/types/work-order";

@Injectable()
export class FinishWaitingParts {
  constructor(private readonly _workOrderRepository: WorkOrderRepository) { }

  async execute(companyInstance: CompanyInstance, workOrderId: string, data: IFinishWaitingParts) {
    const workOrder = await this._workOrderRepository.findById(companyInstance, workOrderId);
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    if (workOrder.status !== MaintenanceStatus.AguardandoPeca) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não está aguardando peças",
        status: HttpStatus.BAD_REQUEST
      })
    }

    const finisherData: IFinishWaitingParts = {
      status: data.status,
      endWaitingParts: data.endWaitingParts
    }

    await this._workOrderRepository.finishWaitingParts(
      companyInstance,
      workOrder.id,
      finisherData
    );

    return finisherData;
  }
}