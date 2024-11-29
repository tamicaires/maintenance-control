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
  employees: {
    id: string;
    name: string;
    job: {
      jobTitle: string;
    };
  }[] | null;
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
    const employeesRaw = serviceAssigment.employees || [];
    const employees: EmployeeBasicInfo[] = employeesRaw.map((employee) => {
      return {
        id: employee.id,
        name: employee.name,
        jobTitle: employee.job.jobTitle
      }
    })
    return {
      id: serviceAssigment.id,
      workOrderId: serviceAssigment.workOrderId,
      service: serviceAssigment.service,
      employee: employees,
      trailer: serviceAssigment.trailer,
      status: serviceAssigment.status,
      startAt: serviceAssigment.startAt,
      endAt: serviceAssigment.endAt,
      createdAt: serviceAssigment.createdAt,
    };
  }
}
