import { Membership } from "../entity/Membership";

export abstract class MembershipRepository {
  abstract create(membership: Membership): Promise<void>;
  abstract findById(id: string): Promise<Membership | null>;
  abstract findByUserId(userId: string): Promise<Membership | null>;
  abstract findByUserIdAndCompanyId(userId: string, companyId: string): Promise<Membership | null>;
}