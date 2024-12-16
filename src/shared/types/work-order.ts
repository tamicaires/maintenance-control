import { WorkOrder } from "src/core/domain/entities/work-order";
import { MaintenanceStatus } from "src/core/enum/maitenance-status.enum";

export interface ICancelWorkOrder {
  workOrderId: string;
  isCancelled: boolean;
  status: MaintenanceStatus;
}

export interface IStartMaintenance {
  status: MaintenanceStatus;
  entryMaintenance: Date;
  boxId: string;
}

export interface IFinishMaintenance {
  status: MaintenanceStatus;
  exitMaintenance: Date;
  exitSupervisor: string;
}

export interface IBackToQueue {
  status: MaintenanceStatus;
}

export interface IStartWaitingParts {
  status: MaintenanceStatus;
  startWaitingParts: Date;
}

export interface IFinishWaitingParts {
  status: MaintenanceStatus;
  endWaitingParts: Date;
}

export interface WorkOrderWithRelationalInfo extends WorkOrder {
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
  box: {
    id: string;
    name: string;
    isActive: boolean
  }
}