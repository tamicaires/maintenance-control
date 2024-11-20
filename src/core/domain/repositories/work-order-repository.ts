import { Filters } from 'src/shared/types/filters.interface';
import { WorkOrder } from '../entities/work-order';
import { TypeOfMaintenance } from '../../enum/type-of-maintenance.enum';
import { CompanyInstance } from 'src/core/company/company-instance';

export abstract class WorkOrderRepository {
  abstract create(workOrder: WorkOrder): Promise<void>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<WorkOrder | null>;
  abstract save(workOrder: WorkOrder): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findMany(
    page: number,
    perPage: number,
    filters?: Filters,
  ): Promise<WorkOrder[]>;
  abstract findLastWorkOrderByType(
    typeOfMaintenance: TypeOfMaintenance,
  ): Promise<WorkOrder | null>;
}
