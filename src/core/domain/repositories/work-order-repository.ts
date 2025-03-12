import { MaintenanceFilters } from 'src/shared/types/filters.interface';
import { WorkOrder } from '../entities/work-order';
import { TypeOfMaintenance } from '../../enum/type-of-maintenance.enum';
import { CompanyInstance } from 'src/core/company/company-instance';
import { ICancelWorkOrder, IFinishMaintenance, IFinishWaitingParts, IStartMaintenance, IStartWaitingParts, IWorkOrderWithCount } from 'src/shared/types/work-order';
import { MaintenanceStatus } from 'src/core/enum/maitenance-status.enum';

export abstract class WorkOrderRepository {
  abstract create(workOrder: WorkOrder): Promise<WorkOrder>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<WorkOrder | null>;
  abstract save(workOrder: WorkOrder): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findMany(
    companyInstance: CompanyInstance,
    page: number,
    perPage: number,
    filters?: MaintenanceFilters,
  ): Promise<IWorkOrderWithCount>;
  abstract findLastWorkOrderByType(
    typeOfMaintenance: TypeOfMaintenance,
  ): Promise<WorkOrder | null>;
  abstract cancelWorkOrder(companyInstance: CompanyInstance, data: ICancelWorkOrder): Promise<void>;
  abstract startMaintenance(companyInstance: CompanyInstance, workOrderId: string, data: IStartMaintenance): Promise<void>;
  abstract finishMaintenance(companyInstance: CompanyInstance, workOrderId: string, data: IFinishMaintenance): Promise<void>;
  abstract backToQueue(companyInstance: CompanyInstance, workOrderId: string): Promise<void>;
  abstract startWaitingParts(companyInstance: CompanyInstance, workOrderId: string, status: IStartWaitingParts): Promise<void>;
  abstract finishWaitingParts(companyInstance: CompanyInstance, workOrderId: string, status: IFinishWaitingParts): Promise<void>;
  abstract getWorkOrderWithRelationalData(companyInstance: CompanyInstance, workOrderId: string): Promise<any>;
  abstract getDaily(companyInstance: CompanyInstance, startOfDay: Date, endOfDay: Date, status?: MaintenanceStatus): Promise<any[]>;
  abstract getQueueChartData(companyInstance: CompanyInstance, startDate: Date, endDate: Date): Promise<any[]>;
  abstract getTypeMaintenanceChartData(companyInstance: CompanyInstance, date: Date): Promise<any[]>;
}
