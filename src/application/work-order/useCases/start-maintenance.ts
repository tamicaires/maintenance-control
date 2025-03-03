import { HttpStatus, Injectable } from "@nestjs/common";
import { EventService } from "src/application/event/service/event.service";
import { CompanyInstance } from "src/core/company/company-instance";
import { Event } from "src/core/domain/entities/event";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { EventActionEnum, EventDescriptionEnum } from "src/core/enum/event";
import { MaintenanceStatus } from "src/core/enum/maitenance-status.enum";
import { SubjectEnum } from "src/core/enum/subject.enum";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { IStartMaintenance } from "src/shared/types/work-order";

@Injectable()
export class StartMaintenanceWorkOrder {
  constructor(
    private readonly _workOrderRepository: WorkOrderRepository,
    private readonly _eventService: EventService,
  ) { }

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

    const event = {
      event: EventActionEnum.Started,
      subject: SubjectEnum.Maintenance,
      description: EventDescriptionEnum.Start_Maintenance,
      handledById: workOrder.userId,
      handledAt: new Date(),
      workOrderId: workOrder.id,
      companyId: companyInstance.getCompanyId(),
      fleetId: workOrder.fleetId
    }

    this._eventService.registerEvent(companyInstance, event);

    return startMaintenanceData;
  }
}