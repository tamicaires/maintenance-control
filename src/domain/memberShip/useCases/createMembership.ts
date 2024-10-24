import { Injectable } from "@nestjs/common";
import { TRole } from "src/core/enum/role.enum";
import { MembershipRepository } from "../repositories/membershipRepository";
import { Membership } from "../entity/Membership";
import { MembershipAlreadyExists } from "../exceptions/MembershipAlreadyExists";
import { CompanyNotFoundException } from "src/domain/company/exceptions/CompanyNotFoundException";
import { CompanyRepository } from "src/domain/company/repositories/CompanyRepository";
import { UserNotFoundException } from "src/domain/user/exceptions/UserNotFountException";
import { UserRepository } from "src/domain/user/repositories/UserRepository";
import { CompanyInstance } from "src/core/company/company-instance";

interface CreateMembershipRequest {
  userId: string;
  role: TRole[];
}

@Injectable()
export class CreateMembership {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly membershipRepository: MembershipRepository
  ) { }

  async execute(companyInstance: CompanyInstance, data: CreateMembershipRequest) {
    const user = await this.userRepository.findById(data.userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const company = await this.companyRepository.findById(companyInstance);
    if (!company) {
      throw new CompanyNotFoundException();
    }

    const membershipAlreadyExists = await this.membershipRepository.findByUserIdAndCompanyId(
      companyInstance,
      data.userId
    );
    if (membershipAlreadyExists) {
      throw new MembershipAlreadyExists();
    }
    const membership = new Membership(companyInstance.addCompanyFilter(data));

    await this.membershipRepository.create(membership);

    return membership;
  }
}