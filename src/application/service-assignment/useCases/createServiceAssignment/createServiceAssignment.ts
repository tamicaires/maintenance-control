import { HttpStatus, Injectable } from '@nestjs/common';
import { ServiceAssignment } from '../../../../core/domain/entities/service-assignment';
import { ServiceAssignmentRepository } from 'src/core/domain/repositories/service-assignment-repository';
import { TServiceAssigmentStatus } from 'src/core/enum/service-assigment-status';
import { WorkOrderRepository } from 'src/core/domain/repositories/work-order-repository';
import { ExceptionHandler } from 'src/core/exceptions/ExceptionHandler';
import { CompanyInstance } from 'src/core/company/company-instance';
import { MaintenanceStatus } from 'src/core/enum/maitenance-status.enum';

interface CreateServiceAssignmentRequest {
  workOrderId: string;
  serviceId: string;
  trailerId: string;
  status: TServiceAssigmentStatus
  startAt: Date | null;
  endAt: Date | null;
}

@Injectable()
export class CreateServiceAssignment {
  constructor(
    private serviceAssignmentRepository: ServiceAssignmentRepository,
    private workOrderRepository: WorkOrderRepository
  ) { }

  async execute(companyInstance: CompanyInstance, data: CreateServiceAssignmentRequest) {
    const workOrder = await this.workOrderRepository.findById(companyInstance, data.workOrderId);
    if (!workOrder) {
      throw new ExceptionHandler({
        message: "Ordem de serviço não encontrada",
        status: HttpStatus.NOT_FOUND
      })
    }

    if (workOrder.status === MaintenanceStatus.Finalizada) {
      throw new ExceptionHandler({
        message: "Não é possível adicionar serviços a uma ordem de serviço finalizada",
        status: HttpStatus.BAD_REQUEST
      })
    }

    if (workOrder.isCancelled) {
      throw new ExceptionHandler({
        message: "Não é possível adicionar serviços a uma ordem de serviço cancelada",
        status: HttpStatus.BAD_REQUEST
      })
    }

    const serviceAssignment = new ServiceAssignment({
      workOrderId: workOrder.id,
      serviceId: data.serviceId,
      trailerId: data.trailerId,
      status: data.status,
      startAt: data.startAt,
      endAt: data.endAt,
    });

    await this.serviceAssignmentRepository.create(serviceAssignment);

    return serviceAssignment;
  }
}
