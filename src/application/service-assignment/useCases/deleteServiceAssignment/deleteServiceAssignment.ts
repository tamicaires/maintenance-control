import { Injectable } from '@nestjs/common';
import { ServiceAssignmentNotFoundException } from '../../exceptions/serviceAssignmentNotFoundException';
import { ServiceAssignmentRepository } from 'src/core/domain/repositories/service-assignment-repository';

interface DeleteServiceAssignmentRequest {
  serviceAssignmentId: string;
}

@Injectable()
export class DeleteServiceAssignment {
  constructor(
    private serviceAssignmentRepository: ServiceAssignmentRepository,
  ) {}

  async execute({ serviceAssignmentId }: DeleteServiceAssignmentRequest) {
    const serviceAssignment =
      await this.serviceAssignmentRepository.findById(serviceAssignmentId);

    if (!serviceAssignment) throw new ServiceAssignmentNotFoundException();

    await this.serviceAssignmentRepository.delete(serviceAssignmentId);
  }
}
