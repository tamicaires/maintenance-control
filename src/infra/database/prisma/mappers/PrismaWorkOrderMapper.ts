import { WorkOrder as WorkOrderRaw} from "@prisma/client";
import { WorkOrder } from "src/modules/workOrder/entities/WorkOrder";
import { Box } from "src/modules/workOrder/enum/box.enum";
import { MaintenanceStatus } from "src/modules/workOrder/enum/maitenance-status.enum";
import { TypeOfMaintenance } from "src/modules/workOrder/enum/type-of-maintenance.enum";

export class PrismaWorkOrderMapper {
  static toPrisma({
    id,
    severityLevel,
    entryQueue,
    entryMaintenance,
    exitMaintenance,
    fleetId,
    typeOfMaintenance,
    status,
    box,
    createdAt,
    updatedAt
  }: WorkOrder): WorkOrderRaw {
    return {
      id,
      severityLevel,
      entryQueue,
      entryMaintenance,
      exitMaintenance,
      fleetId,
      typeOfMaintenance,
      status,
      box,
      createdAt,
      updatedAt 
    };
  };

  static toDomain({
    id,
    severityLevel,
    entryQueue,
    entryMaintenance,
    exitMaintenance,
    fleetId,
    typeOfMaintenance,
    status,
    box,
    createdAt,
    updatedAt
  }: WorkOrderRaw): WorkOrder{
    return new WorkOrder({
      severityLevel,
      entryQueue,
      entryMaintenance,
      exitMaintenance,
      fleetId,
      typeOfMaintenance: typeOfMaintenance as TypeOfMaintenance,
      status: status as MaintenanceStatus,
      box: box as Box,
      createdAt,
      updatedAt
    }, 
    id
    );
  };
};