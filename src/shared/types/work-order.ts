import { WorkOrder } from "src/core/domain/entities/work-order";
import { MaintenanceStatus } from "src/core/enum/maitenance-status.enum";
import { QueryCount } from "./query";
import { Carrier } from "src/core/domain/entities/carrier";
import { User } from "src/core/domain/entities/user";
import { TypeOfMaintenance } from "@prisma/client";

export interface IWorkOrder {
  displayId: string | null;
  severityLevel: string;
  entryQueue: Date | null;
  entryMaintenance: Date | null;
  exitMaintenance: Date | null;
  startWaitingParts: Date | null;
  endWaitingParts: Date | null;
  queueDuration: number | null;
  maintenanceDuration: number | null;
  waitingPartsDuration: number | null;
  exitSupervisor: string | null;
  status: MaintenanceStatus;
  fleetId: string;
  userId: string;
  companyId: string;
  typeOfMaintenance: TypeOfMaintenance;
  boxId: string | null;
  isCancelled: boolean;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}
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
  note: {
    id: string;
    content: string;
    createdAt: Date;
    user: {
      id: string;
      name: string;
    }
  } | null;
  user: {
    id: string;
    name: string;
  }
};

export interface WorkOrderDailyView extends WorkOrder {
  fleet: {
    fleetNumber: string;
    carrier: Pick<Carrier, 'carrierName'>;
  };
  user: Pick<User, 'id' | 'name'>;
}

export interface IWorkOrderWithFleetAndUser extends IWorkOrder {
  openedBy?: Pick<User, 'id' | 'name'>;
  fleet: {
    fleetNumber: string;
    carrier: Pick<Carrier, 'carrierName'>;
  };
  user: Pick<User, 'id' | 'name'>;
}
export interface IWorkOrderWithCount extends QueryCount {
  workOrders: IWorkOrder[];
}

