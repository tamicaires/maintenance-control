import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { AbilityBuilder } from "../abilityBuilder";
import { Action } from "../ability";

export const defineNoteAbilities = (
  builder: AbilityBuilder,
  companyId: string,
  userRoles: TRole[]
) => {
  builder.can(Action.Read, 'Note', { companyId });

  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'Note', { companyId });
    builder.can(Action.Read, 'Note', { companyId });
    builder.can(Action.Create, 'Note', { companyId });
    builder.can(Action.Update, 'Note', { companyId });
    builder.cannot(Action.Delete, 'Note', { companyId });
  }

  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'Note', { companyId });
    builder.can(Action.Read, 'Note', { companyId });
    builder.can(Action.Create, 'Note', { companyId });
    builder.can(Action.Update, 'Note', { companyId });
    builder.cannot(Action.Delete, 'Note', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'Note', { companyId });
    builder.can(Action.Create, 'Note', { companyId });
    builder.can(Action.Update, 'Note', { companyId });
    builder.cannot(Action.Delete, 'Note', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'Note', { companyId });
    builder.can(Action.Create, 'Note', { companyId });
    builder.can(Action.Update, 'Note', { companyId });
    builder.cannot(Action.Delete, 'Note', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_VIEWER)) {
    builder.can(Action.View_Report, 'Note', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_MANAGER)) {
    builder.can(Action.View_Report, "Note", { companyId });
  }
}