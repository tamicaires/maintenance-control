import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { Action } from "../ability";
import { AbilityBuilder } from "../abilityBuilder";

export const defineEmployeeAbilities = (
  builder: AbilityBuilder,
  companyId: string,
  userRoles: TRole[]
) => {
  builder.can(Action.Read, 'Employee', { companyId });

  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'Employee', { companyId });
    builder.can(Action.Read, 'Employee', { companyId });
    builder.can(Action.Create, 'Employee', { companyId });
    builder.can(Action.Update, 'Employee', { companyId });
    builder.cannot(Action.Delete, 'Employee', { companyId });
  }

  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'Employee', { companyId });
    builder.can(Action.Read, 'Employee', { companyId });
    builder.can(Action.Create, 'Employee', { companyId });
    builder.can(Action.Update, 'Employee', { companyId });
    builder.cannot(Action.Delete, 'Employee', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'Employee', { companyId });
    builder.can(Action.Create, 'Employee', { companyId });
    builder.can(Action.Update, 'Employee', { companyId });
    builder.cannot(Action.Delete, 'Employee', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'Employee', { companyId });
    builder.can(Action.Create, 'Employee', { companyId });
    builder.can(Action.Update, 'Employee', { companyId });
    builder.cannot(Action.Delete, 'Employee', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_VIEWER)) {
    builder.can(Action.View_Report, 'Employee', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_MANAGER)) {
    builder.can(Action.View_Report, "Employee", { companyId });
  }
}