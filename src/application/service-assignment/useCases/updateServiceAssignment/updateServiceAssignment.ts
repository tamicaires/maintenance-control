import { ServiceAssignmentRepository } from 'src/core/domain/repositories/service-assignment-repository';
import { ServiceAssignmentNotFoundException } from '../../exceptions/serviceAssignmentNotFoundException';
import { Injectable } from '@nestjs/common';
import { mapUpdateServiceAssignment } from 'src/shared/utils/service-assignment-utils';
import { TServiceAssigmentStatus } from 'src/core/enum/service-assigment-status';

interface UpdateServiceAssignmentRequest {
  serviceAssignmentId: string;
  workOrderId?: string;
  serviceId?: string;
  trailerId: string;
  axleId: string | null;
  status: TServiceAssigmentStatus
  startAt?: Date | null;
  endAt?: Date | null;
}

@Injectable()
export class UpdateServiceAssignment {
  constructor(
    private serviceAssignmentRepository: ServiceAssignmentRepository,
  ) { }

  async execute({
    serviceAssignmentId,
    workOrderId,
    serviceId,
    trailerId,
    status,
    startAt,
    endAt
  }: UpdateServiceAssignmentRequest) {
    const serviceAssignment =
      await this.serviceAssignmentRepository.findById(serviceAssignmentId);

    if (!serviceAssignment) throw new ServiceAssignmentNotFoundException();

    mapUpdateServiceAssignment(serviceAssignment, {
      workOrderId,
      serviceId,
      trailerId,
      status,
      startAt,
      endAt
    });

    await this.serviceAssignmentRepository.save(serviceAssignment);

    return serviceAssignment;
  }
}
