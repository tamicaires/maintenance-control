import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Action } from '../../ability/ability';
import { PERMISSION_KEY } from '../decorators/permissions.decorator';
import { defineAbilitiesForUser } from '../../ability/permissions';
import { CheckUserMembership } from 'src/domain/memberShip/useCases/checkUserMembership';
import { Membership } from 'src/domain/memberShip/entity/Membership';
import { TSubject } from 'src/core/enum/subject.enum';
import { CookiesEnum } from 'src/core/enum/cookies';
import { CompanyInstance } from 'src/core/company/company-instance';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly checkUserMembership: CheckUserMembership
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get<{ action: Action; subject: TSubject }>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    if (!permission) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();

    const companyId = request.cookies[CookiesEnum.CompanyId];
    const companyInstance = CompanyInstance.create(companyId);
    const membership = await this.checkUserMembership.execute(
      companyInstance,
      request.user.id
    );

    return this.checkPermissions(membership, permission);
  }

  private checkPermissions(
    membership: Membership,
    permission: { action: Action; subject: TSubject }
  ): boolean {
    console.log("membership", membership);
    console.log("permission", permission);
    const ability = defineAbilitiesForUser(membership.userId, membership.companyId, membership.role);
    const companyId = membership.companyId;
    console.log("ability", ability);
    if (!ability.can(permission.action, permission.subject, { companyId })) {
      throw new ForbiddenException(
        `Ação ${permission.action} no recurso ${permission.subject} não permitida.`
      );
    }

    return true;
  }
}