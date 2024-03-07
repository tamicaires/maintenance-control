import { WorkOrder } from "../entities/WorkOrder";

export abstract class WorkOrderRepository {
  abstract create (workOrder: WorkOrder): Promise<void>;
  abstract findById (id: string): Promise<WorkOrder | null>;
  abstract save (workOrder: WorkOrder): Promise<void>; 
  abstract delete (id: string): Promise<void>;
  abstract findMany (
    page: number,
    perPage: number
  ): Promise<WorkOrder[]>;
  abstract getWorkOrderServices(id: string): Promise<any>
};

