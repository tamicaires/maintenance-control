import { CompanyInstance } from "src/core/company/company-instance";
import { ServiceAssignment } from "../entities/service-assignment";
import { ChangeStatusResponseType, ChangeStatusType } from "src/shared/types/chance-service-assigment-status";

export abstract class ServiceAssignmentRepository {
  abstract create(serviceAssignment: ServiceAssignment): Promise<void>;
  abstract findById(id: string): Promise<ServiceAssignment | null>;
  abstract save(serviceAssignment: ServiceAssignment): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findMany(
    page: number,
    perPage: number,
  ): Promise<any>;
  abstract findByWorkOrder(companyInstance: CompanyInstance, workOrderId: string): Promise<any>;
  abstract changeStatus(
    companyInstance: CompanyInstance,
    serviceAssigmentId: string,
    data: ChangeStatusType
  ): Promise<ChangeStatusResponseType>;
  abstract deleteAll(companyInstance: CompanyInstance): Promise<void>;
}
