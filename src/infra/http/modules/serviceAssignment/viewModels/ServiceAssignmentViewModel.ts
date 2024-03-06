import { ServiceAssignment } from "src/modules/serviceAssignment/entities/ServiceAssignment";

export class ServiceAssignmentViewModel {
  static toHttp({ id, workOrderId, serviceId, employeeId }: ServiceAssignment){
    return {
      id, 
      workOrderId,
      serviceId,
      employeeId
    };
  };
};