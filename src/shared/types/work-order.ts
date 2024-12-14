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