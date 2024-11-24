import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { ServiceAssignmentRepository } from "src/core/domain/repositories/service-assignment-repository";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

@Injectable()
export class GetServiceAssigmentByWorkOrder {
  constructor(
    private readonly _serviceAssignmentRepository: ServiceAssignmentRepository,
    private readonly _workOrderRepository: WorkOrderRepository
  ) { }

  async execute(companyInstance: CompanyInstance, workOrderId: string) {
    const workOrder = this._workOrderRepository.findById(companyInstance, workOrderId)
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não encontrada",
        status: 404
      })
    }

    return this._serviceAssignmentRepository.findByWorkOrder(
      companyInstance,
      workOrderId
    )
  }
}