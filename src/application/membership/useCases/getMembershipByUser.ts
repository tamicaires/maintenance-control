import { Injectable, NotFoundException } from "@nestjs/common";
import { MembershipRepository } from "../../../core/domain/repositories/membership-repository";

@Injectable()
export class GetMembershipByUser {
  constructor(private readonly membershipRepository: MembershipRepository) { }

  async execute(userId: string) {
    const membership = await this.membershipRepository.findByUserId(userId);
    if (!membership) {
      throw new NotFoundException("Não há associação de usuário com empresa");
    }
    return membership;
  }
}