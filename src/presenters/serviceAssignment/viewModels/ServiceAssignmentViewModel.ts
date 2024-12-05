import { ServiceAssignment } from "src/core/domain/entities/service-assignment";
import { ServiceCategory } from "src/core/enum/service-category.enum";
import { EmployeeBasicInfo } from "src/shared/types/employee.type";

interface ITrailer {
  id: string;
  position: number;
  plate: string;
}
interface IServiceAssigmentWithRelationalInfo extends ServiceAssignment {
  service: {
    id: string;
    serviceName: string;
    serviceCategory: ServiceCategory;
  };
  serviceAssignmentEmployee: {
    employee: {
      id: string;
      name: string;
      job: {
        jobTitle: string;
      };
    };
  }[]

  trailer: ITrailer;
}

export class ServiceAssignmentViewModel {
  static toHttp({ id, workOrderId, serviceId }: ServiceAssignment) {
    return {
      id,
      workOrderId,
      serviceId,
    };
  }

  static toHttpWithRelationalInfo(serviceAssigment: IServiceAssigmentWithRelationalInfo) {
    const employees: EmployeeBasicInfo[] = serviceAssigment.serviceAssignmentEmployee.map((serviceEmployee) => {
      return {
        id: serviceEmployee.employee.id,
        name: serviceEmployee.employee.name,
        jobTitle: serviceEmployee.employee.job.jobTitle

      }
    }) || [];
    return {
      id: serviceAssigment.id,
      workOrderId: serviceAssigment.workOrderId,
      service: serviceAssigment.service,
      employees: employees,
      trailer: serviceAssigment.trailer,
      status: serviceAssigment.status,
      startAt: serviceAssigment.startAt,
      endAt: serviceAssigment.endAt,
      createdAt: serviceAssigment.createdAt,
    };
  }
}
