import { Injectable } from '@nestjs/common';
import { WorkOrderRepository } from 'src/modules/workOrder/repositories/workOrderRepository';
import { ServiceRepository } from '../../repositories/serviceRepository';
import { WorkOrderNotFoundException } from 'src/modules/workOrder/exceptions/workOrderNotFoundException';

@Injectable()
export class GetServicesByWorkOrder {
  constructor(
    private workOrderRepository: WorkOrderRepository,
    private serviceRepository: ServiceRepository,
  ) {}

  async execute(workOrderId: string) {
    const workOrder = await this.workOrderRepository.findById(workOrderId);

    if (!workOrder) {
      throw new WorkOrderNotFoundException();
    }

    return await this.serviceRepository.findByWorkOrder(workOrderId);
  }
}
