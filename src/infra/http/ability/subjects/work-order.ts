import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { AbilityBuilder } from "../abilityBuilder";
import { Action } from "../ability";

export const defineWorkOrderAbilities = (
  builder: AbilityBuilder,
  companyId: string,
  userRoles: TRole[]
) => {
  builder.can(Action.Read, 'WorkOrder', { companyId });

  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'WorkOrder', { companyId });
    builder.can(Action.Read, 'WorkOrder', { companyId });
    builder.can(Action.Create, 'WorkOrder', { companyId });
    builder.can(Action.Update, 'WorkOrder', { companyId });
    builder.cannot(Action.Delete, 'WorkOrder', { companyId });
  }

  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'WorkOrder', { companyId });
    builder.can(Action.Read, 'WorkOrder', { companyId });
    builder.can(Action.Create, 'WorkOrder', { companyId });
    builder.can(Action.Update, 'WorkOrder', { companyId });
    builder.cannot(Action.Delete, 'WorkOrder', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'WorkOrder', { companyId });
    builder.can(Action.Create, 'WorkOrder', { companyId });
    builder.can(Action.Update, 'WorkOrder', { companyId });
    builder.cannot(Action.Delete, 'WorkOrder', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'WorkOrder', { companyId });
    builder.can(Action.Create, 'WorkOrder', { companyId });
    builder.can(Action.Update, 'WorkOrder', { companyId });
    builder.cannot(Action.Delete, 'WorkOrder', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_VIEWER)) {
    builder.can(Action.View_Report, 'WorkOrder', { companyId });
  }

  if (userRoles.includes(RoleEnum.REPORT_MANAGER)) {
    builder.can(Action.View_Report, "WorkOrder", { companyId });
  }
}