import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { AbilityBuilder } from "../abilityBuilder";
import { Action } from "../ability";

export const defineTireAbilities = (
  builder: AbilityBuilder,
  companyId: string,
  userRoles: TRole[]
) => {
  builder.can(Action.Read, 'Tire', { companyId });

  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'Tire', { companyId });
    builder.can(Action.Read, 'Tire', { companyId });
    builder.can(Action.Create, 'Tire', { companyId });
    builder.can(Action.Update, 'Tire', { companyId });
    builder.cannot(Action.Delete, 'Tire', { companyId });
  }

  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'Tire', { companyId });
    builder.can(Action.Read, 'Tire', { companyId });
    builder.can(Action.Create, 'Tire', { companyId });
    builder.can(Action.Update, 'Tire', { companyId });
    builder.cannot(Action.Delete, 'Tire', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'Tire', { companyId });
    builder.can(Action.Create, 'Tire', { companyId });
    builder.can(Action.Update, 'Tire', { companyId });
    builder.cannot(Action.Delete, 'Tire', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'Tire', { companyId });
    builder.can(Action.Create, 'Tire', { companyId });
    builder.can(Action.Update, 'Tire', { companyId });
    builder.cannot(Action.Delete, 'Tire', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_VIEWER)) {
    builder.can(Action.View_Report, 'Tire', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_MANAGER)) {
    builder.can(Action.View_Report, "Tire", { companyId });
  }
}