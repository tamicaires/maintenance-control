import { Injectable } from '@nestjs/common';
import { UserHasNoCompanyException } from 'src/core/exceptions/UserHasNoCompanyException';
import { MembershipRepository } from '../repositories/membershipRepository';
import { Membership } from '../entity/Membership';
import { CompanyNotFoundException } from 'src/domain/company/exceptions/CompanyNotFoundException';
import { CompanyRepository } from 'src/domain/company/repositories/CompanyRepository';
import { UserNotFoundException } from 'src/domain/user/exceptions/UserNotFountException';
import { UserRepository } from 'src/domain/user/repositories/UserRepository';


@Injectable()
export class CheckUserMembership {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly membershipRepository: MembershipRepository
  ) { }

  async execute(userId: string, companyId: string): Promise<Membership> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const company = await this.companyRepository.findById(companyId);
    if (!company) {
      throw new CompanyNotFoundException();
    }
    const membership = await this.membershipRepository.findByUserIdAndCompanyId(
      userId,
      companyId
    );

    if (!membership) {
      throw new UserHasNoCompanyException();
    }

    return membership;
  }
}
