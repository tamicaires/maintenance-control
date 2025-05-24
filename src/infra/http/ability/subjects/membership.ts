import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { AbilityBuilder } from "../abilityBuilder";
import { Action } from "../ability";

export const defineMembershipAbilities = (
  builder: AbilityBuilder,
  companyId: string,
  userRoles: TRole[]
) => {
  builder.can(Action.Read, 'Membership', { companyId });

  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'Membership', { companyId });
  }

  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'Membership', { companyId });
    builder.can(Action.Read, 'Membership', { companyId });
    builder.can(Action.Create, 'Membership', { companyId });
    builder.can(Action.Update, 'Membership', { companyId });
    builder.cannot(Action.Delete, 'Membership', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'Membership', { companyId });
    builder.can(Action.Create, 'Membership', { companyId });
    builder.can(Action.Update, 'Membership', { companyId });
    builder.cannot(Action.Delete, 'Membership', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'Membership', { companyId });
    builder.can(Action.Create, 'Membership', { companyId });
    builder.can(Action.Update, 'Membership', { companyId });
    builder.cannot(Action.Delete, 'Membership', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_VIEWER)) {
    builder.can(Action.View_Report, 'Membership', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_MANAGER)) {
    builder.can(Action.View_Report, "Membership", { companyId });
  }
}