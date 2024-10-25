import { Injectable } from '@nestjs/common';
import { ServiceAssignmentNotFoundException } from '../../exceptions/serviceAssignmentNotFoundException';
import { ServiceAssignmentRepository } from 'src/core/domain/repositories/service-assignment-repository';

interface GetServiceAssignmentRequest {
  serviceAssignmentId: string;
}

@Injectable()
export class GetServiceAssignment {
  constructor(
    private serviceAssignmentRepository: ServiceAssignmentRepository,
  ) {}

  async execute({ serviceAssignmentId }: GetServiceAssignmentRequest) {
    const serviceAssignment =
      await this.serviceAssignmentRepository.findById(serviceAssignmentId);

    if (!serviceAssignment) throw new ServiceAssignmentNotFoundException();

    return serviceAssignment;
  }
}
