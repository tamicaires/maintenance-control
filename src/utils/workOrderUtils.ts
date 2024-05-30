import { CreateWorkOrderBody } from "src/infra/http/modules/workOrder/dtos/createWorkOrderBody";
import { UpdateWorkOrderBody } from "src/infra/http/modules/workOrder/dtos/updateWorkOrderBody";
import { WorkOrder } from "src/modules/workOrder/entities/WorkOrder";
import { TypeOfMaintenance } from "src/modules/workOrder/enum/type-of-maintenance.enum";

export const updateWorkOrderProperties = (workOrder: WorkOrder, data: Partial<WorkOrder>) => {
  workOrder.severityLevel = data.severityLevel ?? workOrder.severityLevel;
  workOrder.entryQueue = data.entryQueue ?? workOrder.entryQueue;
  workOrder.entryMaintenance = data.entryMaintenance ?? workOrder.entryMaintenance;
  workOrder.exitMaintenance = data.exitMaintenance ?? workOrder.exitMaintenance;
  workOrder.fleetId = data.fleetId ?? workOrder.fleetId;
  workOrder.userId = data.userId ?? workOrder.userId;
  workOrder.updatedBy = data.updatedBy ?? workOrder.updatedBy;
  workOrder.status = data.status ?? workOrder.status;
  workOrder.typeOfMaintenance = data.typeOfMaintenance ?? workOrder.typeOfMaintenance;
  workOrder.box = data.box ?? workOrder.box;
  workOrder.exitSupervisor = data.exitSupervisor ?? workOrder.exitSupervisor;

  workOrder.queueDuration = calculateDuration(
    workOrder.entryQueue,
    workOrder.entryMaintenance
  );

  workOrder.maintenanceDuration = calculateDuration(
    workOrder.entryMaintenance,
    workOrder.exitMaintenance
  );

  workOrder.waitingPartsDuration = calculateDuration(
    workOrder.startWaitingParts,
    workOrder.endWaitingParts
  );

};

export const calculateDuration = (startDate: Date | null, endDate: Date | null): number | null => {
  if (startDate && endDate) {
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();

    return endTime - startTime;
  } else {
    return null;
  }
};


export const validateMaintenanceDates = ({
  entryMaintenance,
  entryQueue,
  exitMaintenance
}: WorkOrder): boolean => {

  const validateEntryDates = (entryQueue: Date | null,
    entryMaintenance: Date | null) => {

    if (entryQueue && entryMaintenance) {
      if (entryQueue > entryMaintenance) return false;
    };

    return true;
  };

  const validateExitDate = (entryMaintenance: Date | null,
    exitMaintenance: Date | null) => {

    if (entryMaintenance && exitMaintenance) {
      if (entryMaintenance > exitMaintenance) return false;
    };

    return true;
  };

  return validateEntryDates(entryQueue, entryMaintenance)
    && validateExitDate(entryMaintenance, exitMaintenance);
};

export const mapCreateWorkOrderData = (
  userId: string,
  createdBy: string,
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
    typeOfMaintenance,
  } = workOrderData;
  return {
    severityLevel,
    entryQueue,
    entryMaintenance,
    exitMaintenance,
    fleetId,
    userId,
    createdBy,
    box,
    status,
    typeOfMaintenance
  };
};

export const mapUpdateWorkOrderData = (
  workOrderId: string,
  userId: string,
  updatedBy: string,
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
    typeOfMaintenance,
    startWaitingParts,
    endWaitingParts,
    exitSupervisor,
  } = workOrderData;
  console.log(updatedBy)
  return {
    workOrderId,
    severityLevel,
    entryQueue,
    entryMaintenance,
    exitMaintenance,
    fleetId,
    userId,
    updatedBy,
    box,
    status,
    typeOfMaintenance,
    startWaitingParts,
    endWaitingParts,
    exitSupervisor,
  };
};

export const generateDisplayId = (() => {

  const orderServiceCounters = {
    [TypeOfMaintenance.Preditiva]: 0,
    [TypeOfMaintenance.Preventiva]: 0,
    [TypeOfMaintenance.Corretiva]: 0,
  };

  return (type: TypeOfMaintenance): string => {

    let prefix: string;
    switch (type) {
      case TypeOfMaintenance.Preditiva:
        prefix = 'PD';
        break;
      case TypeOfMaintenance.Preventiva:
        prefix = 'PV';
        break;
      case TypeOfMaintenance.Corretiva:
        prefix = 'CO';
        break;
      default:
        throw new Error('Tipo de manutenção inválido.');
    }

    orderServiceCounters[type]++;

    const number = orderServiceCounters[type];

    const formattedNumber = number.toString().padStart(3, '0');

    return `${prefix}${formattedNumber}`;
  };
})();

