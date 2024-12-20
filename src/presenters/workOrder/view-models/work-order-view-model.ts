import { WorkOrderWithRelationalInfo } from "src/shared/types/work-order";

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
    note,
    box,
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
      box,
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
      notes: note,
      boxId,
      createdBy,
      updatedBy,
      isCancelled,
      createdAt,
      updatedAt,
    };
  }
}
