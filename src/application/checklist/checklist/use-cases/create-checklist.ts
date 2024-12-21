import { HttpStatus, Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { Checklist } from "src/core/domain/entities/checklist/checklist";
import { ChecklistRepository } from "src/core/domain/repositories/checklist/checklist-repository";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";

interface IRequest {
  workOrderId: string;
  templateId: string;
}

@Injectable()
export class CreateChecklist {
  constructor(
    private readonly _workOrderIdRepository: WorkOrderRepository,
    private readonly _checklistRepository: ChecklistRepository
  ) { }

  async execute(companyInstance: CompanyInstance, checklist: IRequest) {
    const workOrder = await this._workOrderIdRepository.findById(
      companyInstance,
      checklist.workOrderId
    )
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    const checklistToCreate = new Checklist({
      workOrderId: workOrder.id,
      templateId: checklist.templateId,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return await this._checklistRepository.create(
      companyInstance,
      checklistToCreate
    )
  }
}