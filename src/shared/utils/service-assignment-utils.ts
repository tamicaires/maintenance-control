import { ServiceAssignment } from "src/core/domain/entities/service-assignment";

export const mapUpdateServiceAssignment = (
  serviceAssignment: ServiceAssignment,
  data: Partial<ServiceAssignment>,
) => {
  if (data.workOrderId !== undefined) {
    serviceAssignment.workOrderId = data.workOrderId;
  }

  if (data.serviceId !== undefined) {
    serviceAssignment.serviceId = data.serviceId;
  }

  if (data.employeeId !== undefined) {
    serviceAssignment.employeeId = data.employeeId;
  }

  if (data.startAt !== undefined) {
    serviceAssignment.startAt = data.startAt;
  }

  if (data.endAt !== undefined) {
    serviceAssignment.endAt = data.endAt;
  }
};
