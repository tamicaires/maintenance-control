import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { AbilityBuilder } from "../abilityBuilder";
import { Action } from "../ability";

export const defineServiceAssigmentAbilities = (
  builder: AbilityBuilder,
  companyId: string,
  userRoles: TRole[]
) => {
  builder.can(Action.Read, 'ServiceAssigment', { companyId });

  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'ServiceAssigment', { companyId });
    builder.can(Action.Read, 'ServiceAssigment', { companyId });
    builder.can(Action.Create, 'ServiceAssigment', { companyId });
    builder.can(Action.Update, 'ServiceAssigment', { companyId });
    builder.cannot(Action.Delete, 'ServiceAssigment', { companyId });
  }

  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'ServiceAssigment', { companyId });
    builder.can(Action.Read, 'ServiceAssigment', { companyId });
    builder.can(Action.Create, 'ServiceAssigment', { companyId });
    builder.can(Action.Update, 'ServiceAssigment', { companyId });
    builder.cannot(Action.Delete, 'ServiceAssigment', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'ServiceAssigment', { companyId });
    builder.can(Action.Create, 'ServiceAssigment', { companyId });
    builder.can(Action.Update, 'ServiceAssigment', { companyId });
    builder.cannot(Action.Delete, 'ServiceAssigment', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'ServiceAssigment', { companyId });
    builder.can(Action.Create, 'ServiceAssigment', { companyId });
    builder.can(Action.Update, 'ServiceAssigment', { companyId });
    builder.cannot(Action.Delete, 'ServiceAssigment', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_VIEWER)) {
    builder.can(Action.View_Report, 'ServiceAssigment', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_MANAGER)) {
    builder.can(Action.View_Report, "ServiceAssigment", { companyId });
  }
}