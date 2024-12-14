import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { MaintenanceStatus } from "src/core/enum/maitenance-status.enum";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

@Injectable()
export class BackToQueueWorkOrder {
  constructor(private readonly _workOrderRepository: WorkOrderRepository) { }

  async execute(companyInstance: CompanyInstance, workOrderId: string): Promise<void> {
    const workOrder = await this._workOrderRepository.findById(companyInstance, workOrderId);
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de Serviço não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    if (workOrder.status === MaintenanceStatus.Cancelada) {
      throw new ExceptionHandler({
        message: "Não é possivel retornar uma Ordem de Serviço cancelada para a fila",
        status: HttpStatus.BAD_REQUEST
      })
    }

    if (workOrder.status === MaintenanceStatus.Finalizada) {
      throw new ExceptionHandler({
        message: "Não é possivel retornar uma Ordem de Serviço finalizada para a fila",
        status: HttpStatus.BAD_REQUEST
      })
    }

    await this._workOrderRepository.backToQueue(companyInstance, workOrderId);
  }
}