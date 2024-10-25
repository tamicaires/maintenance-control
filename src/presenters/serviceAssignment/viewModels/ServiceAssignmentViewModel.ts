import { ServiceAssignment } from "src/core/domain/entities/service-assignment";

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
