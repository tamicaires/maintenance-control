import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { AbilityBuilder } from "../abilityBuilder";
import { Action } from "../ability";

export const defineJobAbilities = (
  builder: AbilityBuilder,
  companyId: string,
  userRoles: TRole[]
) => {
  builder.can(Action.Read, 'Job', { companyId });

  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'Job', { companyId });
  }

  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'Job', { companyId });
    builder.can(Action.Read, 'Job', { companyId });
    builder.can(Action.Create, 'Job', { companyId });
    builder.can(Action.Update, 'Job', { companyId });
    builder.cannot(Action.Delete, 'Job', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'Job', { companyId });
    builder.can(Action.Create, 'Job', { companyId });
    builder.can(Action.Update, 'Job', { companyId });
    builder.cannot(Action.Delete, 'Job', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'Job', { companyId });
    builder.can(Action.Create, 'Job', { companyId });
    builder.can(Action.Update, 'Job', { companyId });
    builder.cannot(Action.Delete, 'Job', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_VIEWER)) {
    builder.can(Action.View_Report, 'Job', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_MANAGER)) {
    builder.can(Action.View_Report, "Job", { companyId });
  }
}