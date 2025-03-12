import { QueryCount } from "src/shared/types/query";
import { IWorkOrder, IWorkOrderWithCount, WorkOrderWithRelationalInfo } from "src/shared/types/work-order";

// export interface IWorkOrderViewModel extends QueryCount {
//   workOrders: IWorkOrder[];
// }
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
    companyId,
    updatedBy,
    isCancelled,
    createdAt,
    updatedAt,
    note,
    user,
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
      fleet: fleetInfo,
      fleetId,
      companyId,
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
      openedBy: user,
      createdAt,
      updatedAt,
    };
  }

  static toHttpWithCount(data: IWorkOrderWithCount): IWorkOrderWithCount {
    const workOrders = data.workOrders.map(WorkOrderViewModel.toHttp)
    return {
      workOrders: workOrders,
      totalCount: data.totalCount,
    };
  }
}
