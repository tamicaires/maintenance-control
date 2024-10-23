import { ServiceAssignment as ServiceAssignmentRaw } from '@prisma/client';
import { ServiceAssignment } from 'src/domain/serviceAssignment/entities/ServiceAssignment';

export class PrismaServiceAssignmentMapper {
  static toPrisma({
    id,
    workOrderId,
    serviceId,
    employeeId,
    startAt,
    endAt,
    createdAt,
    updatedAt,
  }: ServiceAssignment): ServiceAssignmentRaw {
    return {
      id,
      workOrderId,
      serviceId,
      employeeId,
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
    employeeId,
    startAt,
    endAt,
    createdAt,
    updatedAt,
  }: ServiceAssignmentRaw): ServiceAssignment {
    return new ServiceAssignment(
      {
        workOrderId,
        serviceId,
        employeeId,
        startAt,
        endAt,
        createdAt,
        updatedAt,
      },
      id,
    );
  }
}
