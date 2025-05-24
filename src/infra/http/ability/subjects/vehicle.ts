import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { AbilityBuilder } from "../abilityBuilder";
import { Action } from "../ability";

export const defineVehicleAbilities = (
  builder: AbilityBuilder,
  companyId: string,
  userRoles: TRole[]
) => {
  builder.can(Action.Read, 'Vehicle', { companyId });

  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'Vehicle', { companyId });
    builder.can(Action.Read, 'Vehicle', { companyId });
    builder.can(Action.Create, 'Vehicle', { companyId });
    builder.can(Action.Update, 'Vehicle', { companyId });
    builder.cannot(Action.Delete, 'Vehicle', { companyId });
  }

  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'Vehicle', { companyId });
    builder.can(Action.Read, 'Vehicle', { companyId });
    builder.can(Action.Create, 'Vehicle', { companyId });
    builder.can(Action.Update, 'Vehicle', { companyId });
    builder.cannot(Action.Delete, 'Vehicle', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'Vehicle', { companyId });
    builder.can(Action.Create, 'Vehicle', { companyId });
    builder.can(Action.Update, 'Vehicle', { companyId });
    builder.cannot(Action.Delete, 'Vehicle', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'Vehicle', { companyId });
    builder.can(Action.Create, 'Vehicle', { companyId });
    builder.can(Action.Update, 'Vehicle', { companyId });
    builder.cannot(Action.Delete, 'Vehicle', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_VIEWER)) {
    builder.can(Action.View_Report, 'Vehicle', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_MANAGER)) {
    builder.can(Action.View_Report, "Vehicle", { companyId });
  }
}