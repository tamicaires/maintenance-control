import { Injectable } from "@nestjs/common";
import { MaintenanceStatus } from "../../enum/maitenance-status.enum";
import { TypeOfMaintenance } from "../../enum/type-of-maintenance.enum";
import { Box } from "../../enum/box.enum";
import { WorkOrder } from "../../entities/WorkOrder";
import { WorkOrderRepository } from "../../repositories/workOrderRepository";
import { generateDisplayId } from "src/utils/workOrderUtils";

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
  box: Box | null;
  createdBy?: string | null; 
};

@Injectable()
export class CreateWorkOrder {
  constructor(private workOrderRepository: WorkOrderRepository) {}

  async execute(data: CreateWorkOrderRequest) {
    const displayId = generateDisplayId(data.typeOfMaintenance);
    console.log(displayId)
    const workOrderWithDisplayId = { ...data, displayId };

    const workOrder = new WorkOrder(
      workOrderWithDisplayId
    );

    await this.workOrderRepository.create(workOrder);

    return workOrder;
  };
};

