import { Injectable } from "@nestjs/common";
import { MaintenanceStatus } from "../../enum/maitenance-status.enum";
import { TypeOfMaintenance } from "../../enum/type-of-maintenance.enum";
import { Box } from "../../enum/box.enum";
import { WorkOrderRepository } from "../../repositories/workOrderRepository";
import { WorkOrderNotFoundException } from "../../exceptions/workOrderNotFoundException";
import { updateWorkOrderProperties, validateMaintenanceDates,  } from "src/utils/workOrderUtils";
import { InvalidDateException } from "../../exceptions/invalidDatesException";

interface UpdateWorkOrderRequest {
  workOrderId: string;
  severityLevel?: string;
  entryQueue?: Date;
  entryMaintenance?: Date;
  exitMaintenance?: Date;
  status?: MaintenanceStatus;
  fleetId?: string;
  typeOfMaintenance?: TypeOfMaintenance;
  box?: Box;
};

@Injectable()
export class UpdateWorkOrder {
  constructor(private workOrderRepository: WorkOrderRepository){}

  async execute(data: UpdateWorkOrderRequest){
    const workOrder = await this.workOrderRepository.findById(data.workOrderId);

    if(!workOrder) throw new WorkOrderNotFoundException();

    updateWorkOrderProperties(workOrder, data);

    if(!validateMaintenanceDates(workOrder)) throw new InvalidDateException();

    await this.workOrderRepository.save(workOrder);

    return workOrder; 
  };
};