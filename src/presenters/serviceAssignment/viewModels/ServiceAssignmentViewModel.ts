import { ServiceAssignment } from "src/core/domain/entities/service-assignment";
import { ServiceCategory } from "src/core/enum/service-category.enum";
import { EmployeeBasicInfo } from "src/shared/types/employee.type";

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
  trailers: {
    id: string;
    position: number;
    plate: string;
  }[] | null;
}

export class ServiceAssignmentViewModel {
  static toHttp({ id, workOrderId, serviceId, employeeId }: ServiceAssignment) {
    return {
      id,
      workOrderId,
      serviceId,
      employeeId,
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
    const trailersRaw = serviceAssigment.trailers || [];
    const trailers = trailersRaw.map((trailer) => {
      return {
        id: trailer.id,
        position: trailer.position,
        licensePlate: trailer.plate
      }
    })
    return {
      id: serviceAssigment.id,
      workOrderId: serviceAssigment.workOrderId,
      service: serviceAssigment.service,
      employee: employees,
      trailers: trailers,
      status: serviceAssigment.status,
      startAt: serviceAssigment.startAt,
      endAt: serviceAssigment.endAt,
      createdAt: serviceAssigment.createdAt,
    };
  }
}
