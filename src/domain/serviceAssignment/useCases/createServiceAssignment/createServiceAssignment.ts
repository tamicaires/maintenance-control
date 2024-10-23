import { Injectable } from '@nestjs/common';
import { ServiceAssignment } from '../../entities/ServiceAssignment';
import { ServiceAssignmentRepository } from '../../repositories/serviceAssignmentRepository';

interface CreateServiceAssignmentRequest {
  workOrderId: string;
  serviceId: string;
  employeeId: string;
  startAt: Date | null;
  endAt: Date | null;
}

@Injectable()
export class CreateServiceAssignment {
  constructor(
    private serviceAssignmentRepository: ServiceAssignmentRepository,
  ) {}

  async execute({
    workOrderId,
    serviceId,
    employeeId,
    startAt, 
    endAt
  }: CreateServiceAssignmentRequest) {
    const serviceAssignment = new ServiceAssignment({
      workOrderId,
      serviceId,
      employeeId,
      startAt, 
      endAt
    });

    await this.serviceAssignmentRepository.create(serviceAssignment);

    return serviceAssignment;
  }
}
