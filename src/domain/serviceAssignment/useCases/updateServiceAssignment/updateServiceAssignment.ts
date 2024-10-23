import { mapUpdateServiceAssignment } from 'src/shared/utils/serviceAssignmentUtils';
import { ServiceAssignmentNotFoundException } from '../../exceptions/serviceAssignmentNotFoundException';
import { ServiceAssignmentRepository } from '../../repositories/serviceAssignmentRepository';
import { Injectable } from '@nestjs/common';

interface UpdateServiceAssignmentRequest {
  serviceAssignmentId: string;
  workOrderId?: string;
  serviceId?: string;
  employeeId?: string;
  startAt?: Date | null;
  endAt?: Date | null;
}

@Injectable()
export class UpdateServiceAssignment {
  constructor(
    private serviceAssignmentRepository: ServiceAssignmentRepository,
  ) {}

  async execute({
    serviceAssignmentId,
    workOrderId,
    serviceId,
    employeeId,
    startAt,
    endAt
  }: UpdateServiceAssignmentRequest) {
    const serviceAssignment =
      await this.serviceAssignmentRepository.findById(serviceAssignmentId);

    if (!serviceAssignment) throw new ServiceAssignmentNotFoundException();

    mapUpdateServiceAssignment(serviceAssignment, {
      workOrderId,
      serviceId,
      employeeId,
      startAt,
      endAt
    });

    await this.serviceAssignmentRepository.save(serviceAssignment);

    return serviceAssignment;
  }
}
