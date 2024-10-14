import { Injectable, NotFoundException } from '@nestjs/common';
import { MembershipRepository } from '../repositories/membershipRepository';
import { SessionData } from 'src/infra/http/modules/auth/models/sessionModel';

@Injectable()
export class SetCurrentMembership {
  constructor(private readonly membershipRepository: MembershipRepository) { }

  async execute(userId: string, companyId: string, session: SessionData) {
    console.log("userId no use case", userId)
    console.log("companyId no use case", companyId)
    console.log("session no use case", session)
    const membership = await this.membershipRepository.findByUserIdAndCompanyId(userId, companyId);
    console.log("membership no usecase", membership)
    if (!membership) {
      throw new NotFoundException('Não foi possível encontrar a relação de afiliãção');
    }

    session.currentMembership = {
      companyId: membership.companyId,
      userId: membership.userId,
      roles: membership.role,
    };

    return session.currentMembership;
  }
}
