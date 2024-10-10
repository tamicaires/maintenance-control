import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from 'src/modules/user/exceptions/UserNotFountException';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { CompanyRepository } from '../repositories/CompanyRepository';
import { CompanyNotFoundException } from '../exceptions/CompanyNotFoundException';

interface AssociateUserToCompanyRequest {
  companyId: string;
  userId: string;
}

@Injectable()
export class AssociateUserToCompany {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}
  async execute({ companyId, userId }: AssociateUserToCompanyRequest) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const company = await this.companyRepository.findById(companyId);
    if (!company) {
      throw new CompanyNotFoundException();
    }

    await this.userRepository.associateUserToCompany(company.id, user.id);
  }
}
