import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { MaintenanceStatus } from "src/core/enum/maitenance-status.enum";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { IStartWaitingParts } from "src/shared/types/work-order";

@Injectable()
export class StartWaitingParts {
  constructor(private readonly _workOrderRepository: WorkOrderRepository) { }

  async execute(companyInstance: CompanyInstance, workOrderId: string, data: IStartWaitingParts): Promise<IStartWaitingParts> {
    const workOrder = await this._workOrderRepository.findById(companyInstance, workOrderId);
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    const isClosed =
      workOrder.status === MaintenanceStatus.Finalizada ||
      workOrder.status === MaintenanceStatus.Cancelada;

    if (isClosed) {
      throw new ExceptionHandler({
        message: "Não é possível alterar o status de uma ordem de serviço finalizada ou cancelada",
        status: HttpStatus.BAD_REQUEST
      })
    }

    if (workOrder.status === MaintenanceStatus.Fila) {
      throw new ExceptionHandler({
        message: "Favor iniciar a manutenção antes de iniciar a espera por peças",
        status: HttpStatus.BAD_REQUEST
      })
    }

    const waitingPartsData: IStartWaitingParts = {
      startWaitingParts: data.startWaitingParts,
      status: data.status
    }

    await this._workOrderRepository.startWaitingParts(companyInstance, workOrderId, waitingPartsData);

    return waitingPartsData;
  }
}
