import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { MaintenanceStatus } from "src/core/enum/maitenance-status.enum";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { ICancelWorkOrder } from "src/shared/types/work-order";

@Injectable()
export class CancelWorkOrder {
  constructor(private readonly _workOrderRepository: WorkOrderRepository) { }

  async execute(companyInstance: CompanyInstance, workOrderId: string): Promise<ICancelWorkOrder> {
    const workOrder = await this._workOrderRepository.findById(companyInstance, workOrderId);
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    if (workOrder.isCancelled || workOrder.status === MaintenanceStatus.Cancelada) {
      throw new ExceptionHandler({
        message: "Ordem de serviço já cancelada",
        status: HttpStatus.BAD_REQUEST
      })
    }

    if (workOrder.status === MaintenanceStatus.Finalizada) {
      throw new ExceptionHandler({
        message: "Ordem de serviço finalizada não pode ser cancelada",
        status: HttpStatus.BAD_REQUEST
      })
    }

    const cancelWorkOrderData: ICancelWorkOrder = {
      workOrderId,
      isCancelled: true,
      status: MaintenanceStatus.Cancelada
    }
    this._workOrderRepository.cancelWorkOrder(companyInstance, cancelWorkOrderData);

    return cancelWorkOrderData;
  }
}