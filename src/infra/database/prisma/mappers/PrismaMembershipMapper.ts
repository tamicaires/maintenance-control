import { Membership as MembershipRaw } from "@prisma/client";
import { Membership } from "src/domain/memberShip/entity/Membership";

export class PrismaMembershipMapper {
  static toPrisma({ id, companyId, userId, role }: Membership): MembershipRaw {
    return {
      id,
      companyId,
      userId,
      role,
    };
  }

  static toDomain({
    id,
    companyId,
    userId,
    role,
  }: MembershipRaw): Membership {
    return new Membership(
      {
        companyId,
        userId,
        role,
      },
      id,
    );
  }
}
