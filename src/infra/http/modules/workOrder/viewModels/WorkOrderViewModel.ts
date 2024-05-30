import { WorkOrder } from "src/modules/workOrder/entities/WorkOrder";

export class WorkOrderViewModel {
  static toHttp({
    id,
    displayId,
    severityLevel,
    entryQueue,
    entryMaintenance,
    exitMaintenance,
    startWaitingParts,
    endWaitingParts,
    queueDuration,
    maintenanceDuration,
    waitingPartsDuration,
    exitSupervisor,
    fleetId,
    userId,
    typeOfMaintenance,
    status,
    box, 
    createdBy,
    updatedBy,
    createdAt,
    updatedAt
  }: WorkOrder){
    return {
      id,
      displayId,
      severityLevel,
      entryQueue,
      entryMaintenance,
      exitMaintenance,
      startWaitingParts,
      endWaitingParts,
      queueDuration,
      maintenanceDuration,
      waitingPartsDuration,
      exitSupervisor,
      fleetId,
      userId,
      typeOfMaintenance,
      status,
      box, 
      createdBy,
      updatedBy,
      createdAt,
      updatedAt
    };
  };
};