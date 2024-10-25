import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../../../../core/domain/repositories/service-repository';
import { WorkOrderRepository } from 'src/core/domain/repositories/work-order-repository';
import { WorkOrderNotFoundException } from 'src/application/work-order/exceptions/workOrderNotFoundException';

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
