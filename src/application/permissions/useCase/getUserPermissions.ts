import { Injectable } from '@nestjs/common';
import { CheckUserMembership } from '../../membership/useCases/checkUserMembership';
import { CompanyInstance } from '../../../core/company/company-instance';
import { defineAbilitiesForUser } from 'src/infra/http/ability/permissions';

@Injectable()
export class GetUserPermissions {
  constructor(
    private readonly checkUserMembership: CheckUserMembership
  ) { }

  async execute(companyInstance: CompanyInstance, userId: string) {
    console.log("companyInstance", companyInstance);
    console.log("userId", userId);
    const membership = await this.checkUserMembership.execute(
      companyInstance,
      userId
    );
    console.log("membership", membership);
    const ability = defineAbilitiesForUser(
      membership.userId,
      membership.companyId,
      membership.role
    );

    return {
      ability,
      roles: membership.role
    };
  }
}