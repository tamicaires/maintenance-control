import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { PartRequest } from "src/core/domain/entities/part-request";
import { PartRequestRepository } from "src/core/domain/repositories/part-request-repository";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

@Injectable()
export class ListPartRequestByWorkOrder {
  constructor(
    private readonly partRequestRepository: PartRequestRepository,
    private readonly workOrderRepository: WorkOrderRepository
  ) { }

  async execute(companyInstance: CompanyInstance, workOrderId: string): Promise<PartRequest[]> {
    const workOrder = await this.workOrderRepository.findById(companyInstance, workOrderId);
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não encontrada",
        status: 404,
      });
    }
    return this.partRequestRepository.listByWorkOrder(companyInstance, workOrderId);
  }
}