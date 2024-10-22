import { Injectable, NotFoundException } from '@nestjs/common';
import { MembershipRepository } from '../repositories/membershipRepository';
import { SessionData } from 'src/infra/http/auth/models/sessionModel';
import { CompanyInstance } from 'src/core/company/company-instance';

@Injectable()
export class SetCurrentMembership {
  constructor(private readonly membershipRepository: MembershipRepository) { }

  async execute(companyInstance: CompanyInstance, userId: string, session: SessionData) {
    const membership = await this.membershipRepository.findByUserIdAndCompanyId(
      companyInstance,
      userId,
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
