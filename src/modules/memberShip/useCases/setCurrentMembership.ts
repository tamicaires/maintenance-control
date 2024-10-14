import { Injectable, NotFoundException } from '@nestjs/common';
import { MembershipRepository } from '../repositories/membershipRepository';
import { SessionData } from 'src/infra/http/modules/auth/models/sessionModel';

@Injectable()
export class SetCurrentMembership {
  constructor(private readonly membershipRepository: MembershipRepository) { }

  async execute(userId: string, companyId: string, session: SessionData) {
    const membership = await this.membershipRepository.findByUserIdAndCompanyId(
      userId,
      companyId
    );

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
