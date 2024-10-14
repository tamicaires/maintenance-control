import { Injectable } from "@nestjs/common";
import { Membership } from "src/modules/memberShip/entity/Membership";
import { MembershipRepository } from "src/modules/memberShip/repositories/membershipRepository";
import { PrismaService } from "../prisma.service";
import { PrismaMembershipMapper } from "../mappers/PrismaMembershipMapper";

@Injectable()
export class PrismaMembershipRepository implements MembershipRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(membership: Membership): Promise<void> {
    const membershipRaw = PrismaMembershipMapper.toPrisma(membership);

    await this.prisma.memberShip.create({
      data: membershipRaw,
    });

  }

  async findById(id: string): Promise<Membership | null> {
    const membershipRaw = await this.prisma.memberShip.findUnique({
      where: { id },
    });

    if (!membershipRaw) {
      return null;
    }

    return PrismaMembershipMapper.toDomain(membershipRaw);
  }

  async findByUserIdAndCompanyId(userId: string, companyId: string): Promise<Membership | null> {
    const membershipRaw = await this.prisma.memberShip.findFirst({
      where: { userId, companyId },
      include: { company: true }
    });

    if (!membershipRaw) {
      return null;
    }

    return PrismaMembershipMapper.toDomain(membershipRaw);
  }

  async findByUserId(userId: string): Promise<Membership | null> {
    const membershipRaw = await this.prisma.memberShip.findFirst({
      where: { userId },
      include: { company: true }
    });
    console.log('membershipRaw', membershipRaw)
    console.log('user id do repo', userId)
    if (!membershipRaw) {
      return null;
    }

    return PrismaMembershipMapper.toDomain(membershipRaw)
  }
}