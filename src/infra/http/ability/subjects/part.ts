import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { AbilityBuilder } from "../abilityBuilder";
import { Action } from "../ability";

export const definePartAbilities = (
  builder: AbilityBuilder,
  companyId: string,
  userRoles: TRole[]
) => {
  builder.can(Action.Read, 'Part', { companyId });

  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'Part', { companyId });
    builder.can(Action.Read, 'Part', { companyId });
    builder.can(Action.Create, 'Part', { companyId });
    builder.can(Action.Update, 'Part', { companyId });
    builder.cannot(Action.Delete, 'Part', { companyId });
  }

  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'Part', { companyId });
    builder.can(Action.Read, 'Part', { companyId });
    builder.can(Action.Create, 'Part', { companyId });
    builder.can(Action.Update, 'Part', { companyId });
    builder.cannot(Action.Delete, 'Part', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'Part', { companyId });
    builder.can(Action.Create, 'Part', { companyId });
    builder.can(Action.Update, 'Part', { companyId });
    builder.cannot(Action.Delete, 'Part', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'Part', { companyId });
    builder.can(Action.Create, 'Part', { companyId });
    builder.can(Action.Update, 'Part', { companyId });
    builder.cannot(Action.Delete, 'Part', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_VIEWER)) {
    builder.can(Action.View_Report, 'Part', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_MANAGER)) {
    builder.can(Action.View_Report, "Part", { companyId });
  }
}