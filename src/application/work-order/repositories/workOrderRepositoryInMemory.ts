import { TypeOfMaintenance } from '../../../core/enum/type-of-maintenance.enum';
import { WorkOrderRepository } from '../../../core/domain/repositories/work-order-repository';
import { WorkOrder } from 'src/core/domain/entities/work-order';
import { CompanyInstance } from 'src/core/company/company-instance';
import { ICancelWorkOrder, IFinishMaintenance, IFinishWaitingParts, IStartMaintenance, IStartWaitingParts, IWorkOrderWithCount } from 'src/shared/types/work-order';
import { MaintenanceFilters } from 'src/shared/types/filters.interface';

export class WorkOrderRepositoryInMemory implements WorkOrderRepository {
  findMany(companyInstance: CompanyInstance, page: number, perPage: number, filters?: MaintenanceFilters): Promise<IWorkOrderWithCount> {
    throw new Error('Method not implemented.');
  }
  getQueueChartData(companyInstance: CompanyInstance, startDate: Date, endDate: Date): Promise<any[]> {
    throw new Error('Method not implemented.');
  }
  getTypeMaintenanceChartData(companyInstance: CompanyInstance, date: Date): Promise<any[]> {
    throw new Error('Method not implemented.');
  }
  getDaily(companyInstance: CompanyInstance, date: Date): Promise<WorkOrder[]> {
    throw new Error('Method not implemented.');
  }
  getWorkOrderWithRelationalData(companyInstance: CompanyInstance, workOrderId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  finishWaitingParts(companyInstance: CompanyInstance, workOrderId: string, status: IFinishWaitingParts): Promise<void> {
    throw new Error('Method not implemented.');
  }
  startWaitingParts(companyInstance: CompanyInstance, workOrderId: string, data: IStartWaitingParts): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public workOrders: WorkOrder[] = [];

  async create(workOrder: WorkOrder): Promise<WorkOrder> {
    this.workOrders.push(workOrder);
    return workOrder
  }

  async findById(companyInstance: CompanyInstance, id: string): Promise<WorkOrder | null> {
    const workOrder = this.workOrders.find((workOrder) => workOrder.id === id);

    if (!workOrder) return null;

    return workOrder;
  }

  async save(workOrder: WorkOrder): Promise<void> {
    const workOrderIndex = this.workOrders.findIndex((currentWorkOrder) => {
      currentWorkOrder.id === workOrder.id;
    });

    if (workOrderIndex > 0) this.workOrders[workOrderIndex] = workOrder;
  }

  async delete(id: string): Promise<void> {
    this.workOrders = this.workOrders.filter(
      (workOrder) => workOrder.id !== id,
    );
  }

  // async findMany(companyInstance: CompanyInstance, page: number, perPage: number): Promise<WorkOrder[]> {
  //   return this.workOrders.slice((page - 1) * perPage, page * perPage);
  // }

  getWorkOrderServices(id: string): Promise<WorkOrder[]> {
    throw new Error('Method not implemented.');
  }

  findLastWorkOrderByType(
    typeOfMaintenance: TypeOfMaintenance,
  ): Promise<WorkOrder | null> {
    throw new Error('Method not implemented.');
  }
  cancelWorkOrder(companyInstance: CompanyInstance, data: ICancelWorkOrder): Promise<void> {
    throw new Error('Method not implemented.');
  }
  startMaintenance(companyInstance: CompanyInstance, workOrderId: string, data: IStartMaintenance): Promise<void> {
    throw new Error('Method not implemented.');
  }

  finishMaintenance(companyInstance: CompanyInstance, workOrderId: string, data: IFinishMaintenance): Promise<void> {
    throw new Error('Method not implemented.');
  }

  backToQueue(companyInstance: CompanyInstance, workOrderId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
