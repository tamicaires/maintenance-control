import { Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Action } from '../../ability/ability';
import { PERMISSION_KEY } from '../decorators/permissions.decorator';
import { defineAbilitiesForUser } from '../../ability/permissions';
import { UserHasNoCompanyException } from 'src/core/exceptions/UserHasNoCompanyException';
import { CheckUserMembership } from 'src/domain/memberShip/useCases/checkUserMembership';
import { UserNotFoundException } from 'src/domain/user/exceptions/UserNotFountException';
import { Membership } from 'src/domain/memberShip/entity/Membership';
import { TSubject } from 'src/core/enum/subject.enum';
import { CookiesEnum } from 'src/core/enum/cookies';

@Injectable()
export class PolicyGuard implements CanActivate {
  private readonly logger = new Logger(PolicyGuard.name);

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
    const user = request.user;
    if (!user) {
      throw new UserNotFoundException();
    }
    const companyId = request.cookies[CookiesEnum.CompanyId];
    console.log('companyId', companyId);
    console.log('userId no guard', user);
    if (!companyId) {
      this.logger.warn('Tentativa de acesso sem companyId');
      throw new UserHasNoCompanyException();
    }

    const membership = await this.checkUserMembership.execute(request.user.id, companyId);

    return this.checkPermissions(
      membership,
      permission
    );
  }

  private checkPermissions(
    membership: Membership,
    permission: { action: Action; subject: TSubject }
  ): boolean {
    const ability = defineAbilitiesForUser(membership.userId, membership.companyId, membership.role);
    const companyId = membership.companyId;
    if (!ability.can(permission.action, permission.subject, { companyId })) {
      throw new ForbiddenException(
        `Ação ${permission.action} no recurso ${permission.subject} não permitida.`
      );
    }

    return true;
  }
}
