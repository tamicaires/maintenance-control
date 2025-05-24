import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { AbilityBuilder } from "../abilityBuilder";
import { Action } from "../ability";

export const defineChecklistAbilities = (
  builder: AbilityBuilder,
  companyId: string,
  userRoles: TRole[]
) => {
  builder.can(Action.Read, 'Checklist', { companyId });

  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'Checklist', { companyId });
  }

  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'Checklist', { companyId });
    builder.can(Action.Read, 'Checklist', { companyId });
    builder.can(Action.Create, 'Checklist', { companyId });
    builder.can(Action.Update, 'Checklist', { companyId });
    builder.cannot(Action.Delete, 'Checklist', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'Checklist', { companyId });
    builder.can(Action.Create, 'Checklist', { companyId });
    builder.can(Action.Update, 'Checklist', { companyId });
    builder.cannot(Action.Delete, 'Checklist', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'Checklist', { companyId });
    builder.can(Action.Create, 'Checklist', { companyId });
    builder.can(Action.Update, 'Checklist', { companyId });
    builder.cannot(Action.Delete, 'Checklist', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_VIEWER)) {
    builder.can(Action.View_Report, 'Checklist', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_MANAGER)) {
    builder.can(Action.View_Report, "Checklist", { companyId });
  }
}