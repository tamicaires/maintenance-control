import { Injectable } from "@nestjs/common";
import { TRole } from "src/core/enum/role.enum";
import { MembershipRepository } from "../../../core/domain/repositories/membership-repository";
import { Membership } from "../../../core/domain/entities/membership";
import { MembershipAlreadyExists } from "../exceptions/MembershipAlreadyExists";
import { CompanyInstance } from "src/core/company/company-instance";
import { UserRepository } from "src/core/domain/repositories/user-repository";
import { CompanyRepository } from "src/core/domain/repositories/company-repository";
import { UserNotFoundException } from "src/application/user/exceptions/UserNotFountException";
import { CompanyNotFoundException } from "src/application/company/exceptions/CompanyNotFoundException";

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