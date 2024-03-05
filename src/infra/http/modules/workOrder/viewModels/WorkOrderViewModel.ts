import { WorkOrder } from "src/modules/workOrder/entities/WorkOrder";

export class WorkOrderViewModel {
  static toHttp({
    id,
    severityLevel,
    entryQueue,
    entryMaintenance,
    exitMaintenance,
    fleetId,
    userId,
    typeOfMaintenance,
    status,
    box
  }: WorkOrder){
    return {
      id,
      severityLevel,
      entryQueue,
      entryMaintenance,
      exitMaintenance,
      fleetId,
      userId,
      typeOfMaintenance,
      status,
      box
    };
  };
};