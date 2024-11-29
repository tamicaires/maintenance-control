import { Injectable } from '@nestjs/common';
import { ServiceAssignment } from '../../../../core/domain/entities/service-assignment';
import { ServiceAssignmentRepository } from 'src/core/domain/repositories/service-assignment-repository';
import { TServiceAssigmentStatus } from 'src/core/enum/service-assigment-status';

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
  ) { }

  async execute({
    workOrderId,
    serviceId,
    trailerId,
    status,
    startAt,
    endAt
  }: CreateServiceAssignmentRequest) {
    const serviceAssignment = new ServiceAssignment({
      workOrderId,
      serviceId,
      trailerId,
      status,
      startAt,
      endAt
    });

    await this.serviceAssignmentRepository.create(serviceAssignment);

    return serviceAssignment;
  }
}
