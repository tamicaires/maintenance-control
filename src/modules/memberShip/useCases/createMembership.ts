import { Injectable } from "@nestjs/common";
import { TRole } from "src/infra/http/modules/ability/enums/role.enum";
import { CompanyRepository } from "src/modules/company/repositories/CompanyRepository";
import { UserRepository } from "src/modules/user/repositories/UserRepository";
import { MembershipRepository } from "../repositories/membershipRepository";
import { UserNotFoundException } from "src/modules/user/exceptions/UserNotFountException";
import { CompanyNotFoundException } from "src/modules/company/exceptions/CompanyNotFoundException";
import { Membership } from "../entity/Membership";
import { MembershipAlreadyExists } from "../exceptions/MembershipAlreadyExists";

interface CreateMembershipRequest {
  userId: string;
  companyId: string;
  role: TRole[];
}

@Injectable()
export class CreateMembership {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly membershipRepository: MembershipRepository
  ) { }

  async execute({ companyId, userId, role }: CreateMembershipRequest) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const company = await this.companyRepository.findById(companyId);
    if (!company) {
      throw new CompanyNotFoundException();
    }

    const membershipAlreadyExists = await this.membershipRepository.findByUserIdAndCompanyId(userId, companyId);
    if (membershipAlreadyExists) {
      throw new MembershipAlreadyExists();
    }
    const membership = new Membership({
      companyId: company.id,
      userId: user.id,
      role: role
    })

    await this.membershipRepository.create(membership);

    return membership;
  }
}