import { CompanyInstance } from "src/core/company/company-instance";
import { PartRequest } from "../entities/part-request";
import { RejectPartRequestDTO } from "src/application/part-request/dto/reject-part-request-dto";
import { ApprovePartRequestDTO } from "src/application/part-request/dto/approve-part-request-dto";
import { MaintenanceFilters, PartRequestFilters } from "src/shared/types/filters.interface";
import { IPartRequestRelationalData, IPartRequestsRelationalDataList } from "src/shared/types/part-request/part-request-relational-data";

export abstract class PartRequestRepository {
  abstract create(companyInstance: CompanyInstance, data: PartRequest): Promise<void>;
  abstract createBatch(data: PartRequest[]): Promise<PartRequest[]>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<any>;
  abstract list(
    companyInstance: CompanyInstance,
    page: number,
    perPage: number,
    filters?: PartRequestFilters,
  ): Promise<IPartRequestsRelationalDataList>;
  abstract listByWorkOrder(companyInstance: CompanyInstance, workOrderId: string): Promise<IPartRequestRelationalData[]>;
  abstract reject(companyInstance: CompanyInstance, rejectData: RejectPartRequestDTO): Promise<void>;
  abstract approve(companyInstance: CompanyInstance, approveData: ApprovePartRequestDTO): Promise<void>;
}