import { CreateWorkOrderBody } from "src/infra/http/modules/workOrder/dtos/createWorkOrderBody";
import { UpdateWorkOrderBody } from "src/infra/http/modules/workOrder/dtos/updateWorkOrderBody";
import { WorkOrder } from "src/modules/workOrder/entities/WorkOrder";

export const updateWorkOrderProperties = (workOrder: WorkOrder, data: Partial<WorkOrder>) => {

  if(data.severityLevel !== undefined){
    workOrder.severityLevel = data.severityLevel;
  };

  if(data.entryQueue !== undefined){
    workOrder.entryQueue = data.entryQueue;
  };

  if(data.entryMaintenance !== undefined){
    workOrder.entryMaintenance = data.entryMaintenance;
  };

  if(data.exitMaintenance !== undefined){
    workOrder.exitMaintenance = data.exitMaintenance;
  };

  if(data.fleetId !== undefined){
    workOrder.fleetId = data.fleetId;
  };

  if(data.userId !== undefined){
    workOrder.userId = data.userId;
  };

  if(data.status !== undefined){
    workOrder.status = data.status;
  };

  if(data.typeOfMaintenance !== undefined){
    workOrder.typeOfMaintenance = data.typeOfMaintenance;
  };

  if(data.box !== undefined){
    workOrder.box = data.box;
  };
};

export const validateMaintenanceDates = ({
  entryMaintenance,
  entryQueue,
  exitMaintenance
}: WorkOrder): boolean => {

  const validateEntryDates = (entryQueue: Date | null, 
    entryMaintenance: Date | null) => {
  
    if(entryQueue && entryMaintenance) {
      if(entryQueue > entryMaintenance) return false;
    };
  
    return true;
  };

  const validateExitDate = (entryMaintenance: Date | null, 
    exitMaintenance: Date | null) => {
  
    if(entryMaintenance && exitMaintenance) {
      if(entryMaintenance > exitMaintenance) return false;
    };
  
    return true;
  };

  return validateEntryDates(entryQueue, entryMaintenance) 
    && validateExitDate(entryMaintenance, exitMaintenance);
};

export const mapCreateWorkOrderData = (
  userId: string,
  workOrderData: CreateWorkOrderBody
  ) => {
    const { 
      severityLevel, 
      entryQueue,
      entryMaintenance,
      exitMaintenance,
      fleetId,
      box,
      status,
      typeOfMaintenance 
    } = workOrderData;

    return {
      severityLevel, 
      entryQueue,
      entryMaintenance,
      exitMaintenance,
      fleetId,
      userId,
      box,
      status,
      typeOfMaintenance
    };
  };

export const mapUpdateWorkOrderData = (
  workOrderId: string,
  userId: string,
  workOrderData: UpdateWorkOrderBody
  ) => {
    const { 
      severityLevel, 
      entryQueue,
      entryMaintenance,
      exitMaintenance,
      fleetId,
      box,
      status,
      typeOfMaintenance 
    } = workOrderData;

    return {
      workOrderId,
      severityLevel, 
      entryQueue,
      entryMaintenance,
      exitMaintenance,
      fleetId,
      userId,
      box,
      status,
      typeOfMaintenance
    };
  };