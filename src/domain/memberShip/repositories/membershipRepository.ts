import { CompanyInstance } from "src/core/company/company-instance";
import { Membership } from "../entity/Membership";

export abstract class MembershipRepository {
  abstract create(membership: Membership): Promise<void>;
  abstract findById(companyInstance: CompanyInstance): Promise<Membership | null>;
  abstract findByUserId(userId: string): Promise<Membership | null>;
  abstract findByUserIdAndCompanyId(companyInstance: CompanyInstance, userId: string): Promise<Membership | null>;
}