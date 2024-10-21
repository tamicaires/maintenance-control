import { ServiceAssignment } from "src/domain/serviceAssignment/entities/ServiceAssignment";

export class ServiceAssignmentViewModel {
  static toHttp({ id, workOrderId, serviceId, employeeId }: ServiceAssignment) {
    return {
      id,
      workOrderId,
      serviceId,
      employeeId,
    };
  }
}
