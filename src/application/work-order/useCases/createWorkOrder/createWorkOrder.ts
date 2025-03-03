import { Injectable } from '@nestjs/common';
import { MaintenanceStatus } from '../../../../core/enum/maitenance-status.enum';
import { TypeOfMaintenance } from '../../../../core/enum/type-of-maintenance.enum';
import { WorkOrderRepository } from '../../../../core/domain/repositories/work-order-repository';
import { generateNextDisplayId, getPrefix } from 'src/shared/utils/workOrderUtils';
import { WorkOrder } from 'src/core/domain/entities/work-order';
import { CompanyInstance } from 'src/core/company/company-instance';
import { EventService } from 'src/application/event/service/event.service';
import { EventActionEnum, EventDescriptionEnum } from 'src/core/enum/event';
import { SubjectEnum } from 'src/core/enum/subject.enum';
import { Event } from 'src/core/domain/entities/event';

interface CreateWorkOrderRequest {
  displayId?: string | null;
  severityLevel: string;
  entryQueue?: Date;
  entryMaintenance?: Date | null;
  exitMaintenance?: Date | null;
  startWaitingParts?: Date | null;
  endWaitingParts?: Date | null;
  queueDuration?: number | null;
  maintenanceDuration?: number | null;
  waitingPartsDuration?: number | null;
  status: MaintenanceStatus;
  fleetId: string;
  userId: string;
  typeOfMaintenance: TypeOfMaintenance;
  boxId: string | null;
  isCancelled: boolean;
  createdBy?: string | null;
}

@Injectable()
export class CreateWorkOrder {
  constructor(
    private workOrderRepository: WorkOrderRepository,
    private readonly _eventService: EventService,
  ) { }

  async execute(companyInstance: CompanyInstance, data: CreateWorkOrderRequest) {
    const prefix = getPrefix(data.typeOfMaintenance);

    const lastWorkOrder =
      await this.workOrderRepository.findLastWorkOrderByType(
        data.typeOfMaintenance,
      );
    const lastDisplayId = lastWorkOrder?.displayId || null;
    const displayId = generateNextDisplayId(lastDisplayId, prefix);

    const workOrderWithDisplayId = { ...data, displayId };

    const workOrder = new WorkOrder(
      companyInstance.addCompanyFilter(workOrderWithDisplayId),
    );

    await this.workOrderRepository.create(workOrder);

    const event = {
      event: EventActionEnum.Queued,
      subject: SubjectEnum.Work_Order,
      description: EventDescriptionEnum.Queue,
      handledById: workOrder.userId,
      handledAt: new Date(),
      workOrderId: workOrder.id,
    }

    this._eventService.registerEvent(companyInstance, event);

    return workOrder;
  }
}
