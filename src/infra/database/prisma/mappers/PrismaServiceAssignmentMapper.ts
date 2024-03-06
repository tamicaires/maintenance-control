import { ServiceAssignment as  ServiceAssignmentRaw } from "@prisma/client";
import { ServiceAssignment } from "src/modules/serviceAssignment/entities/ServiceAssignment";

export class PrismaServiceAssignmentMapper {
  static toPrisma({ 
    id,
    workOrderId,
    serviceId,
    employeeId,
    createdAt,
    updatedAt
  }: ServiceAssignment): ServiceAssignmentRaw{
    return {
    id,
    workOrderId,
    serviceId,
    employeeId,
    createdAt,
    updatedAt
    };
  };

  static toDomain({
    id,
    workOrderId,
    serviceId,
    employeeId,
    createdAt,
    updatedAt
  }: ServiceAssignmentRaw): ServiceAssignment{
    return new ServiceAssignment({
      workOrderId,
      serviceId,
      employeeId,
      createdAt,
      updatedAt
    }, 
    id
    );
  };
};