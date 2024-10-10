import { CreateWorkOrderBody } from 'src/infra/http/modules/workOrder/dtos/createWorkOrderBody';
import { UpdateWorkOrderBody } from 'src/infra/http/modules/workOrder/dtos/updateWorkOrderBody';
import { WorkOrder } from 'src/modules/workOrder/entities/WorkOrder';
import { TypeOfMaintenance } from 'src/modules/workOrder/enum/type-of-maintenance.enum';

export const updateWorkOrderProperties = (
  workOrder: WorkOrder,
  data: Partial<WorkOrder>,
) => {
  workOrder.severityLevel = data.severityLevel ?? workOrder.severityLevel;
  workOrder.entryQueue = data.entryQueue
    ? new Date(data.entryQueue)
    : workOrder.entryQueue;
  workOrder.entryMaintenance = data.entryMaintenance
    ? new Date(data.entryMaintenance)
    : workOrder.entryMaintenance;
  workOrder.exitMaintenance = data.exitMaintenance
    ? new Date(data.exitMaintenance)
    : workOrder.exitMaintenance;
  workOrder.fleetId = data.fleetId ?? workOrder.fleetId;
  workOrder.userId = data.userId ?? workOrder.userId;
  workOrder.updatedBy = data.updatedBy ?? workOrder.updatedBy;
  workOrder.status = data.status ?? workOrder.status;
  workOrder.typeOfMaintenance =
    data.typeOfMaintenance ?? workOrder.typeOfMaintenance;
  workOrder.boxId = data.boxId ?? workOrder.boxId;
  workOrder.exitSupervisor = data.exitSupervisor ?? workOrder.exitSupervisor;

  workOrder.queueDuration = calculateDuration(
    workOrder.entryQueue,
    workOrder.entryMaintenance,
  );
  workOrder.maintenanceDuration = calculateDuration(
    workOrder.entryMaintenance,
    workOrder.exitMaintenance,
  );
  workOrder.waitingPartsDuration = calculateDuration(
    workOrder.startWaitingParts,
    workOrder.endWaitingParts,
  );
};

export const calculateDuration = (
  startDate: Date | null,
  endDate: Date | null,
): number | null => {
  if (
    startDate instanceof Date &&
    !isNaN(startDate.getTime()) &&
    endDate instanceof Date &&
    !isNaN(endDate.getTime())
  ) {
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
  exitMaintenance,
}: WorkOrder): boolean => {
  const validateEntryDates = (
    entryQueue: Date | null,
    entryMaintenance: Date | null,
  ) => {
    if (entryQueue && entryMaintenance) {
      if (entryQueue > entryMaintenance) return false;
    }

    return true;
  };

  const validateExitDate = (
    entryMaintenance: Date | null,
    exitMaintenance: Date | null,
  ) => {
    if (entryMaintenance && exitMaintenance) {
      if (entryMaintenance > exitMaintenance) return false;
    }

    return true;
  };

  return (
    validateEntryDates(entryQueue, entryMaintenance) &&
    validateExitDate(entryMaintenance, exitMaintenance)
  );
};

export const mapCreateWorkOrderData = (
  userId: string,
  createdBy: string,
  workOrderData: CreateWorkOrderBody,
) => {
  const {
    severityLevel,
    entryQueue,
    entryMaintenance,
    exitMaintenance,
    fleetId,
    boxId,
    status,
    isCancelled,
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
    boxId,
    isCancelled,
    status,
    typeOfMaintenance,
  };
};

export const mapUpdateWorkOrderData = (
  workOrderId: string,
  userId: string,
  updatedBy: string,
  workOrderData: UpdateWorkOrderBody,
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
  console.log(updatedBy);
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

export function generateNextDisplayId(
  lastDisplayId: string | null,
  prefix: string,
): string {
  let nextNumber = 1;

  if (lastDisplayId) {
    const parts = lastDisplayId.split('-');
    if (parts.length === 2) {
      const lastNumber = parseInt(parts[1], 10);
      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      } else {
        console.error(
          `Número extraído do lastDisplayId é inválido: ${parts[1]}`,
        );
      }
    } else {
      console.error(`Formato do lastDisplayId inválido: ${lastDisplayId}`);
    }
  }

  return `${prefix}-${nextNumber.toString().padStart(4, '0')}`;
}

export function getPrefix(typeOfMaintenance: TypeOfMaintenance): string {
  switch (typeOfMaintenance) {
    case TypeOfMaintenance.Preditiva:
      return 'PD';
    case TypeOfMaintenance.Preventiva:
      return 'PV';
    case TypeOfMaintenance.Corretiva:
      return 'CO';
    default:
      throw new Error('Tipo de manutenção inválido');
  }
}
