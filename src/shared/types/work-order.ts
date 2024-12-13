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