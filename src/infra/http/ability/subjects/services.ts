import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { Action } from "../ability";
import { AbilityBuilder } from "../abilityBuilder";

export const defineServiceAbilities = (
  builder: AbilityBuilder,
  companyId: string,
  userRoles: TRole[]
) => {
  builder.can(Action.Read, 'Service', { companyId });

  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'Service', { companyId });
  }

  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'Service', { companyId });
    builder.can(Action.Read, 'Service', { companyId });
    builder.can(Action.Create, 'Service', { companyId });
    builder.can(Action.Update, 'Service', { companyId });
    builder.cannot(Action.Delete, 'Service', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'Service', { companyId });
    builder.can(Action.Create, 'Service', { companyId });
    builder.can(Action.Update, 'Service', { companyId });
    builder.cannot(Action.Delete, 'Service', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'Service', { companyId });
    builder.can(Action.Create, 'Service', { companyId });
    builder.can(Action.Update, 'Service', { companyId });
    builder.cannot(Action.Delete, 'Service', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_VIEWER)) {
    builder.can(Action.View_Report, 'Service', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_MANAGER)) {
    builder.can(Action.View_Report, "Service", { companyId });
  }
};
