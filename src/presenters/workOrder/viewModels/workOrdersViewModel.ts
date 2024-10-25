import { WorkOrder } from "src/core/domain/entities/work-order";

interface WorkOrderWithRelationalInfo extends WorkOrder {
  fleet: {
    fleetNumber: string;
    plate: string;
    carrier: {
      carrierName: string;
    };
  };
}

export class WorkOrderViewModel {
  static toHttp({
    id,
    fleet,
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
    boxId,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt,
  }: WorkOrderWithRelationalInfo) {
    const fleetNumber = fleet?.fleetNumber;
    const carrierName = fleet?.carrier?.carrierName;
    const plate = fleet?.plate;
    return {
      id,
      displayId,
      fleetId,
      fleetNumber,
      plate,
      carrierName,
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
      userId,
      typeOfMaintenance,
      status,
      boxId,
      createdBy,
      updatedBy,
      createdAt,
      updatedAt,
    };
  }
}
