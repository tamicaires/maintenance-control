import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { AbilityBuilder } from "../abilityBuilder";
import { Action } from "../ability";

export const defineEventAbilities = (
  builder: AbilityBuilder,
  companyId: string,
  userRoles: TRole[]
) => {
  builder.can(Action.Read, 'Event', { companyId });

  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'Event', { companyId });
  }

  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'Event', { companyId });
    builder.can(Action.Read, 'Event', { companyId });
    builder.can(Action.Create, 'Event', { companyId });
    builder.can(Action.Update, 'Event', { companyId });
    builder.cannot(Action.Delete, 'Event', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'Event', { companyId });
    builder.can(Action.Create, 'Event', { companyId });
    builder.can(Action.Update, 'Event', { companyId });
    builder.cannot(Action.Delete, 'Event', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'Event', { companyId });
    builder.can(Action.Create, 'Event', { companyId });
    builder.can(Action.Update, 'Event', { companyId });
    builder.cannot(Action.Delete, 'Event', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_VIEWER)) {
    builder.can(Action.View_Report, 'Event', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_MANAGER)) {
    builder.can(Action.View_Report, "Event", { companyId });
  }
}