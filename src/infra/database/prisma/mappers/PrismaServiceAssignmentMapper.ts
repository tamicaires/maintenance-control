import { ServiceAssignment as ServiceAssignmentRaw } from '@prisma/client';
import { ServiceAssignment } from 'src/core/domain/entities/service-assignment';

export class PrismaServiceAssignmentMapper {
  static toPrisma({
    id,
    workOrderId,
    serviceId,
    trailerId,
    status,
    startAt,
    endAt,
    createdAt,
    updatedAt,
  }: ServiceAssignment): ServiceAssignmentRaw {
    return {
      id,
      workOrderId,
      serviceId,
      trailerId,
      status,
      startAt,
      endAt,
      createdAt,
      updatedAt,
    };
  }

  static toDomain({
    id,
    workOrderId,
    serviceId,
    trailerId,
    status,
    startAt,
    endAt,
    createdAt,
    updatedAt,
  }: ServiceAssignmentRaw): ServiceAssignment {
    return new ServiceAssignment(
      {
        workOrderId,
        serviceId,
        trailerId,
        status,
        startAt,
        endAt,
        createdAt,
        updatedAt,
      },
      id,
    );
  }
}
