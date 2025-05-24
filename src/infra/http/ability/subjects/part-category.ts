import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { AbilityBuilder } from "../abilityBuilder";
import { Action } from "../ability";

export const definePartCategoryAbilities = (
  builder: AbilityBuilder,
  companyId: string,
  userRoles: TRole[]
) => {
  builder.can(Action.Read, 'PartCategory', { companyId });

  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'PartCategory', { companyId });
    builder.can(Action.Read, 'PartCategory', { companyId });
    builder.can(Action.Create, 'PartCategory', { companyId });
    builder.can(Action.Update, 'PartCategory', { companyId });
    builder.cannot(Action.Delete, 'PartCategory', { companyId });
  }

  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'PartCategory', { companyId });
    builder.can(Action.Read, 'PartCategory', { companyId });
    builder.can(Action.Create, 'PartCategory', { companyId });
    builder.can(Action.Update, 'PartCategory', { companyId });
    builder.cannot(Action.Delete, 'PartCategory', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'PartCategory', { companyId });
    builder.can(Action.Create, 'PartCategory', { companyId });
    builder.can(Action.Update, 'PartCategory', { companyId });
    builder.cannot(Action.Delete, 'PartCategory', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'PartCategory', { companyId });
    builder.can(Action.Create, 'PartCategory', { companyId });
    builder.can(Action.Update, 'PartCategory', { companyId });
    builder.cannot(Action.Delete, 'PartCategory', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_VIEWER)) {
    builder.can(Action.View_Report, 'PartCategory', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_MANAGER)) {
    builder.can(Action.View_Report, "PartCategory", { companyId });
  }
}