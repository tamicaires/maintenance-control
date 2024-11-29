import { CompanyInstance } from "src/core/company/company-instance";
import { ServiceAssignment } from "../entities/service-assignment";
import { IAddServiceResponsible } from "src/shared/types/service-assigment/add-service-responsibe";

export abstract class ServiceAssignmentRepository {
  abstract create(serviceAssignment: ServiceAssignment): Promise<void>;
  abstract findById(id: string): Promise<ServiceAssignment | null>;
  abstract save(serviceAssignment: ServiceAssignment): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findMany(
    page: number,
    perPage: number,
  ): Promise<ServiceAssignment[]>;
  abstract findByWorkOrder(companyInstance: CompanyInstance, workOrderId: string): Promise<any>;
  abstract addResponsible(companyInstance: CompanyInstance, data: IAddServiceResponsible);
}
