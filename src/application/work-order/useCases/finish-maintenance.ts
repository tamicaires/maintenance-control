import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { MaintenanceStatus } from "src/core/enum/maitenance-status.enum";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { IFinishMaintenance } from "src/shared/types/work-order";

@Injectable()
export class FinishMaintenanceWorkOrder {
  constructor(private readonly _workOrderRepository: WorkOrderRepository) { }

  async execute(companyInstance: CompanyInstance, workOrderId: string, data: IFinishMaintenance): Promise<IFinishMaintenance> {
    const workOrder = await this._workOrderRepository.findById(companyInstance, workOrderId);
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    if (workOrder.status === MaintenanceStatus.Cancelada) {
      throw new ExceptionHandler({
        message: "Ordem de serviço cancelada não pode ser finalizada",
        status: HttpStatus.BAD_REQUEST
      })
    }
    if (workOrder.status === MaintenanceStatus.Finalizada) {
      throw new ExceptionHandler({
        message: "Ordem de serviço já finalizada",
        status: HttpStatus.BAD_REQUEST
      })
    }

    const finishMaintenanceData: IFinishMaintenance = {
      status: MaintenanceStatus.Finalizada,
      exitMaintenance: data.exitMaintenance,
      exitSupervisor: data.exitSupervisor
    }

    this._workOrderRepository.finishMaintenance(
      companyInstance,
      workOrder.id,
      finishMaintenanceData
    )

    return finishMaintenanceData;
  }
}