import { Filters } from 'src/types/filters.interface';
import { WorkOrder } from '../entities/WorkOrder';

export abstract class WorkOrderRepository {
  abstract create(workOrder: WorkOrder): Promise<void>;
  abstract findById(id: string): Promise<WorkOrder | null>;
  abstract save(workOrder: WorkOrder): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findMany(
    page: number,
    perPage: number,
    filters?: Filters,
  ): Promise<WorkOrder[]>;
}
