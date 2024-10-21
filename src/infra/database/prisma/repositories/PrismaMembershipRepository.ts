import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaMembershipMapper } from "../mappers/PrismaMembershipMapper";
import { MembershipRepository } from "src/domain/memberShip/repositories/membershipRepository";
import { Membership } from "src/domain/memberShip/entity/Membership";

@Injectable()
export class PrismaMembershipRepository implements MembershipRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(membership: Membership): Promise<void> {
    const membershipRaw = PrismaMembershipMapper.toPrisma(membership);

    await this.prisma.membership.create({
      data: membershipRaw,
    });

  }

  async findById(id: string): Promise<Membership | null> {
    const membershipRaw = await this.prisma.membership.findUnique({
      where: { id },
    });

    if (!membershipRaw) {
      return null;
    }

    return PrismaMembershipMapper.toDomain(membershipRaw);
  }

  async findByUserIdAndCompanyId(userId: string, companyId: string): Promise<Membership | null> {
    const membershipRaw = await this.prisma.membership.findFirst({
      where: { userId, companyId },
      include: { company: true }
    });

    if (!membershipRaw) {
      return null;
    }

    return PrismaMembershipMapper.toDomain(membershipRaw);
  }

  async findByUserId(userId: string): Promise<Membership | null> {
    const membershipRaw = await this.prisma.membership.findFirst({
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