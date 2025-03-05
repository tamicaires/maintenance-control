import { MaintenanceStatus } from "src/core/enum/maitenance-status.enum";
import { RequestStatus } from "src/core/enum/part-request";
import { TypeOfMaintenance } from "src/core/enum/type-of-maintenance.enum";

export interface Filters<T> {
  status?: T
  endDate?: Date;
  startDate?: Date;
}
export interface MaintenanceFilters extends Filters<MaintenanceStatus | MaintenanceStatus[]> {
  fleetNumber?: string;
  displayId?: string;
  typeOfMaintenance?: TypeOfMaintenance | TypeOfMaintenance[];
  severityLevel?: string | string[];
}

export interface PartRequestFilters {
  status?: RequestStatus;
  startDate?: Date;
  endDate?: Date;
}

export interface FleetFilters {
  isActive?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface IServiceFilters {
  serviceCategory?: string;
  serviceName?: string;
}

export interface IEventFilters {
  page?: number;
  perPage?: number;
  event?: string;
  subject?: string;
  startDate?: Date;
  endDate?: Date;
}
