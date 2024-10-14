import { Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Action } from '../../ability/ability';
import { PERMISSION_KEY } from '../decorators/permissions.decorator';
import { defineAbilitiesForUser } from '../../ability/permissions';
import { TSubject } from '../../ability/enums/subject.enum';
import { ForbiddenUserRoleException } from 'src/exceptions/ForbiddenUserRoleException';
import { TRole } from '../../ability/enums/role.enum';

@Injectable()
export class PolicyGuard implements CanActivate {
  private readonly logger = new Logger(PolicyGuard.name);

  constructor(private readonly reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission = this.reflector.get<{ action: Action; subject: TSubject }>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    if (!permission) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const currentMembershipSession = request.session?.currentMembership;

    if (!currentMembershipSession) {
      this.logger.warn('Tentativa de acesso sem sessão válida ou dados incompletos na sessão');
      throw new ForbiddenUserRoleException();
    }

    const { userId, companyId, roles: userRoles } = currentMembershipSession;

    return this.checkPermissions(
      userId,
      companyId,
      userRoles,
      permission
    );
  }

  private checkPermissions(
    userId: string,
    companyId: string,
    userRoles: TRole[],
    permission: { action: Action; subject: TSubject }
  ): boolean {
    const ability = defineAbilitiesForUser(userId, companyId, userRoles);

    if (!ability.can(permission.action, permission.subject, { companyId })) {
      throw new ForbiddenException(`Ação ${permission.action} no recurso ${permission.subject} não permitida.`);
    }

    return true;
  }
}
