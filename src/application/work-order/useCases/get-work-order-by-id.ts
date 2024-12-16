import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { WorkOrderWithRelationalInfo } from "src/shared/types/work-order";

@Injectable()
export class GetWorkOrderById {
  constructor(private readonly _workOrderRepository: WorkOrderRepository) { }

  async execute(companyInstance: CompanyInstance, workOrderId: string): Promise<WorkOrderWithRelationalInfo> {
    const workOrder = await this._workOrderRepository.getWorkOrderWithRelationalData(
      companyInstance,
      workOrderId
    );
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    return workOrder;
  }
}