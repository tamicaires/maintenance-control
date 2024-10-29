import { Injectable } from '@nestjs/common';
import { MaintenanceStatus } from '../../../../core/enum/maitenance-status.enum';
import { TypeOfMaintenance } from '../../../../core/enum/type-of-maintenance.enum';
import { WorkOrderRepository } from '../../../../core/domain/repositories/work-order-repository';
import { generateNextDisplayId, getPrefix } from 'src/shared/utils/workOrderUtils';
import { WorkOrder } from 'src/core/domain/entities/work-order';
import { CompanyInstance } from 'src/core/company/company-instance';

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
  constructor(private workOrderRepository: WorkOrderRepository) { }

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

    return workOrder;
  }
}
