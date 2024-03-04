import { WorkOrder } from "../entities/WorkOrder";
import { Box } from "../enum/box.enum";
import { MaintenanceStatus } from "../enum/maitenance-status.enum";
import { TypeOfMaintenance } from "../enum/type-of-maintenance.enum";

type Override =  Partial<WorkOrder>

export const makeWorkOrder = ({id, ...override}: Override) => {
  return new WorkOrder({
      fleetId: '123456',
      severityLevel: 'high',
      entryQueue: new Date(),
      entryMaintenance: new Date(),
      status: MaintenanceStatus.QUEUE,
      box: Box.FIVE,
      typeOfMaintenance: TypeOfMaintenance.CORRECTIVE,
      ...override
  }, 
  id
  );
};