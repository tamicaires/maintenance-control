import { Injectable } from '@nestjs/common';
import { UserHasNoCompanyException } from 'src/core/exceptions/UserHasNoCompanyException';
import { MembershipRepository } from '../../../core/domain/repositories/membership-repository';
import { Membership } from '../../../core/domain/entities/membership';
import { CompanyInstance } from 'src/core/company/company-instance';
import { UserRepository } from 'src/core/domain/repositories/user-repository';
import { CompanyRepository } from 'src/core/domain/repositories/company-repository';
import { UserNotFoundException } from 'src/application/user/exceptions/UserNotFountException';
import { CompanyNotFoundException } from 'src/application/company/exceptions/CompanyNotFoundException';


@Injectable()
export class CheckUserMembership {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly membershipRepository: MembershipRepository
  ) { }

  async execute(companyInstance: CompanyInstance, userId: string): Promise<Membership> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const company = await this.companyRepository.findById(companyInstance);
    if (!company) {
      throw new CompanyNotFoundException();
    } 

    const membership = await this.membershipRepository.findByUserIdAndCompanyId(
      companyInstance,
      userId,
      );
    if (!membership) {
      throw new UserHasNoCompanyException();
    }

    return membership;
  }
}
