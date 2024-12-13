import { TypeOfMaintenance } from '../../../core/enum/type-of-maintenance.enum';
import { WorkOrderRepository } from '../../../core/domain/repositories/work-order-repository';
import { WorkOrder } from 'src/core/domain/entities/work-order';
import { CompanyInstance } from 'src/core/company/company-instance';
import { ICancelWorkOrder, IStartMaintenance } from 'src/shared/types/work-order';

export class WorkOrderRepositoryInMemory implements WorkOrderRepository {

  public workOrders: WorkOrder[] = [];

  async create(workOrder: WorkOrder): Promise<void> {
    this.workOrders.push(workOrder);
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

  async findMany(page: number, perPage: number): Promise<WorkOrder[]> {
    return this.workOrders.slice((page - 1) * perPage, page * perPage);
  }

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
}
