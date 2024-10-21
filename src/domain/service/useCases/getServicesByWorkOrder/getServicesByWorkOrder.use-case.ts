import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../../repositories/serviceRepository';
import { WorkOrderRepository } from 'src/domain/workOrder/repositories/workOrderRepository';
import { WorkOrderNotFoundException } from 'src/domain/workOrder/exceptions/workOrderNotFoundException';

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
