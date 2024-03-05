import { Injectable } from "@nestjs/common";
import { MaintenanceStatus } from "../../enum/maitenance-status.enum";
import { TypeOfMaintenance } from "../../enum/type-of-maintenance.enum";
import { Box } from "../../enum/box.enum";
import { WorkOrder } from "../../entities/WorkOrder";
import { WorkOrderRepository } from "../../repositories/workOrderRepository";

interface CreateWorkOrderRequest {
  severityLevel: string;
  entryQueue?: Date;
  entryMaintenance?: Date | null;
  exitMaintenance?: Date | null;
  status: MaintenanceStatus;
  fleetId: string;
  userId: string;
  typeOfMaintenance: TypeOfMaintenance;
  box?: Box | null;
};

@Injectable()
export class CreateWorkOrder {
  constructor(private workOrderRepository: WorkOrderRepository){}

  async execute(data: CreateWorkOrderRequest){
    const workOrder = new WorkOrder(data);

    await this.workOrderRepository.create(workOrder);

    return workOrder;
  };
};