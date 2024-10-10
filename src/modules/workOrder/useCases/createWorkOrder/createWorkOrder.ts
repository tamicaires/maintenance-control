import { Injectable } from '@nestjs/common';
import { MaintenanceStatus } from '../../enum/maitenance-status.enum';
import { TypeOfMaintenance } from '../../enum/type-of-maintenance.enum';
import { Box } from '../../enum/box.enum';
import { WorkOrder } from '../../entities/WorkOrder';
import { WorkOrderRepository } from '../../repositories/workOrderRepository';
import { generateNextDisplayId, getPrefix } from 'src/utils/workOrderUtils';

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
  companyId: string;
  typeOfMaintenance: TypeOfMaintenance;
  boxId: string | null;
  isCancelled: boolean;
  createdBy?: string | null;
}

@Injectable()
export class CreateWorkOrder {
  constructor(private workOrderRepository: WorkOrderRepository) {}

  async execute(data: CreateWorkOrderRequest) {
    const prefix = getPrefix(data.typeOfMaintenance);

    const lastWorkOrder =
      await this.workOrderRepository.findLastWorkOrderByType(
        data.typeOfMaintenance,
      );
    const lastDisplayId = lastWorkOrder?.displayId || null;
    const displayId = generateNextDisplayId(lastDisplayId, prefix);

    const workOrderWithDisplayId = { ...data, displayId };

    const workOrder = new WorkOrder(workOrderWithDisplayId);

    await this.workOrderRepository.create(workOrder);

    return workOrder;
  }
}
