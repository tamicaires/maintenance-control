import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { AbilityBuilder } from "../abilityBuilder";
import { Action } from "../ability";

export const defineBoxAbilities = (
  builder: AbilityBuilder,
  companyId: string,
  userRoles: TRole[]
) => {
  builder.can(Action.Read, 'Box', { companyId });

  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'Box', { companyId });
    builder.can(Action.Read, 'Box', { companyId });
    builder.can(Action.Create, 'Box', { companyId });
    builder.can(Action.Update, 'Box', { companyId });
    builder.cannot(Action.Delete, 'Box', { companyId });
  }

  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'Box', { companyId });
    builder.can(Action.Read, 'Box', { companyId });
    builder.can(Action.Create, 'Box', { companyId });
    builder.can(Action.Update, 'Box', { companyId });
    builder.cannot(Action.Delete, 'Box', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'Box', { companyId });
    builder.can(Action.Create, 'Box', { companyId });
    builder.can(Action.Update, 'Box', { companyId });
    builder.cannot(Action.Delete, 'Box', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'Box', { companyId });
    builder.can(Action.Create, 'Box', { companyId });
    builder.can(Action.Update, 'Box', { companyId });
    builder.cannot(Action.Delete, 'Box', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_VIEWER)) {
    builder.can(Action.View_Report, 'Box', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_MANAGER)) {
    builder.can(Action.View_Report, "Box", { companyId });
    builder.can(Action.Export, "Box", { companyId });
  }
}