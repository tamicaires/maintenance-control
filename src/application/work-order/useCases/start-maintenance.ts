import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { MaintenanceStatus } from "src/core/enum/maitenance-status.enum";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { IStartMaintenance } from "src/shared/types/work-order";

@Injectable()
export class StartMaintenanceWorkOrder {
  constructor(private readonly _workOrderRepository: WorkOrderRepository) { }

  async execute(companyInstance: CompanyInstance, workOrderId: string, data: IStartMaintenance): Promise<IStartMaintenance> {
    const workOrder = await this._workOrderRepository.findById(companyInstance, workOrderId);
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    const isClosedStatus =
      workOrder.status === MaintenanceStatus.Cancelada ||
      workOrder.status === MaintenanceStatus.Finalizada;

    if (isClosedStatus) {
      throw new ExceptionHandler({
        message: "Ordem de serviço finalizada ou cancelada não pode ser alterada",
        status: HttpStatus.BAD_REQUEST
      })
    }

    if (workOrder.status === data.status) {
      throw new ExceptionHandler({
        message: "Ordem de serviço já consta em manutenção",
        status: HttpStatus.BAD_REQUEST
      })
    }

    const startMaintenanceData: IStartMaintenance = {
      status: data.status,
      entryMaintenance: data.entryMaintenance,
      boxId: data.boxId
    }
    this._workOrderRepository.startMaintenance(
      companyInstance,
      workOrder.id,
      startMaintenanceData
    )

    return startMaintenanceData;
  }
}