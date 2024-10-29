import { CompanyInstance } from "src/core/company/company-instance";
import { PartRequest } from "../entities/part-request";
import { IRejectPartRequestInput } from "src/shared/types/part-request/reject-part-request";
import { RejectPartRequestDTO } from "src/application/part-request/dto/reject-part-request-dto";
import { IApprovePartRequestInput } from "src/shared/types/part-request/approve-part-request";
import { ApprovePartRequestDTO } from "src/application/part-request/dto/approve-part-request-dto";

export abstract class PartRequestRepository {
  abstract create(companyInstance: CompanyInstance, data: PartRequest): Promise<void>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<PartRequest | null>;
  abstract list(companyInstance: CompanyInstance): Promise<PartRequest[]>;
  abstract reject(companyInstance: CompanyInstance, rejectData: RejectPartRequestDTO): Promise<void>;
  abstract approve(companyInstance: CompanyInstance, approveData: ApprovePartRequestDTO): Promise<void>;
}