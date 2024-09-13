import { Service } from 'src/modules/service/entities/Service';
import { EmployeeBasicInfo } from 'src/types/employee.type';

interface ServiceWithEmployee extends Service {
  serviceAssignmets: {
    employee: {
      id: string;
      name: string;
      job: {
        jobTitle: string;
      };
    };
  }[];
}

export class ServiceWithEmployeeViewModel {
  static toHttp({
    id,
    serviceName,
    serviceCategory,
    serviceAssignmets,
  }: ServiceWithEmployee) {
    const employees: EmployeeBasicInfo[] = serviceAssignmets.map(
      (assignment) => {
        const { employee } = assignment;
        return {
          id: employee.id,
          name: employee.name,
          jobTitle: employee.job.jobTitle,
        };
      },
    );

    return {
      id,
      serviceName,
      serviceCategory,
      employees,
    };
  }
}
