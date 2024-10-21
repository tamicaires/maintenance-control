import { Injectable } from '@nestjs/common';
import { ServiceAssignment } from '../../entities/ServiceAssignment';
import { ServiceAssignmentRepository } from '../../repositories/serviceAssignmentRepository';

interface CreateServiceAssignmentRequest {
  workOrderId: string;
  serviceId: string;
  employeeId: string;
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
  }: CreateServiceAssignmentRequest) {
    const serviceAssignment = new ServiceAssignment({
      workOrderId,
      serviceId,
      employeeId,
    });

    await this.serviceAssignmentRepository.create(serviceAssignment);

    return serviceAssignment;
  }
}
