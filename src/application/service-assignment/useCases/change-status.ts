import { HttpStatus, Injectable } from "@nestjs/common";
import { MaintenanceStatus } from "@prisma/client";
import { CompanyInstance } from "src/core/company/company-instance";
import { ServiceAssignment } from "src/core/domain/entities/service-assignment";
import { ServiceAssignmentRepository } from "src/core/domain/repositories/service-assignment-repository";
import { WorkOrderRepository } from "src/core/domain/repositories/work-order-repository";
import { ServiceAssigmentStatus } from "src/core/enum/service-assigment-status";
import { ExceptionHandler } from "src/core/exceptions/ExceptionHandler";
import { ChangeStatusResponseType, ChangeStatusType } from "src/shared/types/chance-service-assigment-status";
import { ValidationConditionsType } from "src/shared/types/validate-conditions";

@Injectable()
export class ChangeStatus {
  constructor(
    private readonly _serviceAssignmentRepository: ServiceAssignmentRepository,
    private readonly _workOrderRepository: WorkOrderRepository
  ) { }

  async execute(companyInstance: CompanyInstance, data: ChangeStatusType): Promise<ChangeStatusResponseType> {
    const serviceAssignment = await this._serviceAssignmentRepository.findById(data.serviceAssignmentId);
    if (!serviceAssignment) {
      throw new ExceptionHandler({
        message: 'Designação de serviço não encontrada',
        status: HttpStatus.NOT_FOUND
      });
    }

    const workOrder = await this._workOrderRepository.findById(companyInstance, serviceAssignment.workOrderId);
    if (!workOrder) {
      throw new ExceptionHandler({
        message: 'Ordem de serviço não encontrada',
        status: HttpStatus.NOT_FOUND
      });
    }

    const forbiddenChangeStatusConditions = this.getForbiddenChangeStatusConditions(
      workOrder.status,
      data,
      serviceAssignment
    );

    forbiddenChangeStatusConditions.forEach(({ condition, exception }) => {
      if (condition) {
        throw new ExceptionHandler(exception);
      }
    });

    return await this._serviceAssignmentRepository.changeStatus(
      companyInstance,
      data.serviceAssignmentId,
      data
    );
  }

  private getForbiddenChangeStatusConditions(
    workOrderStatus: MaintenanceStatus,
    data: ChangeStatusType,
    serviceAssignment: ServiceAssignment
  ): ValidationConditionsType[] {
    const forbiddenChangeStatusConditions = [
      {
        condition: workOrderStatus === MaintenanceStatus.Finalizada,
        exception: {
          message: "Não é possível alterar o status de uma designação de serviço de uma ordem de serviço finalizada",
          status: HttpStatus.BAD_REQUEST,
        },
      },
      {
        condition: serviceAssignment?.status === ServiceAssigmentStatus.CANCELED,
        exception: {
          message: "Designação de serviço já foi cancelada",
          status: HttpStatus.BAD_REQUEST,
        },
      },
      {
        condition: serviceAssignment?.status === ServiceAssigmentStatus.COMPLETED,
        exception: {
          message: "Designação de serviço já foi concluída",
          status: HttpStatus.BAD_REQUEST,
        },
      },
      {
        condition:
          serviceAssignment?.status === ServiceAssigmentStatus.IN_PROGRESS &&
          data.status === ServiceAssigmentStatus.IN_PROGRESS,
        exception: {
          message: "Designação de serviço já foi iniciada.",
          status: HttpStatus.BAD_REQUEST,
        },
      },
      {
        condition: data.status === ServiceAssigmentStatus.IN_PROGRESS && !data.startAt,
        exception: {
          message: "Data de início é obrigatória para iniciar serviço.",
          status: HttpStatus.BAD_REQUEST,
        },
      },
      {
        condition: data.status === ServiceAssigmentStatus.COMPLETED && !data.endAt,
        exception: {
          message: "Data de término é obrigatória para finalizar serviço.",
          status: HttpStatus.BAD_REQUEST,
        },
      },
    ];

    return forbiddenChangeStatusConditions;
  }
}
