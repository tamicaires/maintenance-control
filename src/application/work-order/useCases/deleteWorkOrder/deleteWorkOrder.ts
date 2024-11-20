import { Injectable } from '@nestjs/common';
import { WorkOrderRepository } from '../../../../core/domain/repositories/work-order-repository';
import { WorkOrderNotFoundException } from '../../exceptions/workOrderNotFoundException';
import { CompanyInstance } from 'src/core/company/company-instance';

@Injectable()
export class DeleteWorkOrder {
  constructor(private workOrderRepository: WorkOrderRepository) {}

  async execute(companyInstance: CompanyInstance, workOrderId: string): Promise<void> {
    const workOrder = await this.workOrderRepository.findById(
      companyInstance, 
      workOrderId
    );

    if (!workOrder) throw new WorkOrderNotFoundException();

    await this.workOrderRepository.delete(workOrderId);
  }
}
