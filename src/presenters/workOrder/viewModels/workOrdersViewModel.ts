import { WorkOrder } from "src/core/domain/entities/work-order";

interface WorkOrderWithRelationalInfo extends WorkOrder {
  fleet: {
    fleetNumber: string;
    carrier: {
      carrierName: string;
    };
    trailers: {
      id: string;
      plate: string;
      position: string;
      isActive: boolean;
      axles: {
        id: string;
        position: string;
      }[]
    }[] | null;
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
    isCancelled,
    createdAt,
    updatedAt,
  }: WorkOrderWithRelationalInfo) {
    const fleetNumber = fleet?.fleetNumber;
    const carrierName = fleet?.carrier?.carrierName;

    const trailersData = fleet.trailers?.map((trailer) => ({
      id: trailer.id,
      plate: trailer.plate,
      position: trailer.position,
      isActive: trailer.isActive,
      axles: trailer.axles?.map((axle) => ({
        id: axle.id,
        position: axle.position,
      })),
    })) || [];

    const fleetInfo = {
      fleetNumber,
      carrierName,
      trailers: trailersData
    }

    return {
      id,
      displayId,
      fleetInfo,
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
      isCancelled,
      createdAt,
      updatedAt,
    };
  }
}
