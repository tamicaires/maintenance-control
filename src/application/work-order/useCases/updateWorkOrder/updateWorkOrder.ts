import { Injectable } from '@nestjs/common';
import { MaintenanceStatus } from '../../../../core/enum/maitenance-status.enum';
import { TypeOfMaintenance } from '../../../../core/enum/type-of-maintenance.enum';
import { Box } from '../../../../core/enum/box.enum';
import { WorkOrderRepository } from '../../../../core/domain/repositories/work-order-repository';
import { WorkOrderNotFoundException } from '../../exceptions/workOrderNotFoundException';
import {
  updateWorkOrderProperties,
  validateMaintenanceDates,
} from 'src/shared/utils/workOrderUtils';
import { InvalidDateException } from '../../exceptions/invalidDatesException';

interface UpdateWorkOrderRequest {
  workOrderId: string;
  severityLevel?: string;
  entryQueue?: Date;
  entryMaintenance?: Date;
  exitMaintenance?: Date;
  startWaitingParts?: Date;
  endWaitingParts?: Date;
  exitSupervisor?: string;
  status?: MaintenanceStatus;
  fleetId?: string;
  userId: string;
  typeOfMaintenance?: TypeOfMaintenance;
  box?: Box;
  isCancelled?: boolean;
}

@Injectable()
export class UpdateWorkOrder {
  constructor(private workOrderRepository: WorkOrderRepository) {}

  async execute(data: UpdateWorkOrderRequest) {
    const workOrder = await this.workOrderRepository.findById(data.workOrderId);

    if (!workOrder) throw new WorkOrderNotFoundException();

    updateWorkOrderProperties(workOrder, data);

    if (!validateMaintenanceDates(workOrder)) throw new InvalidDateException();

    await this.workOrderRepository.save(workOrder);

    return workOrder;
  }
}
