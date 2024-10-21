import { RoleEnum, TRole } from "src/infra/http/modules/ability/enums/role.enum";
import { Action } from "../ability";
import { AbilityBuilder } from "../abilityBuilder";

export const defineFleetAbilities = (builder: AbilityBuilder, companyId: string, userRoles: TRole[]) => {
  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'Fleet', { companyId });
    builder.can(Action.Read, 'Fleet', { companyId });
  }

  if (userRoles.includes(RoleEnum.GENERAL_VIEWER)) {
    builder.can(Action.Read, 'Fleet', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'Fleet', { companyId });
    builder.can(Action.Update, 'Fleet', { companyId });
    builder.cannot(Action.Delete, 'Fleet', { companyId });
  }

  if(userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'Fleet', { companyId });
    builder.can(Action.Update, 'Fleet', { companyId });
    builder.can(Action.Delete, 'Fleet', { companyId });
  }

  if(userRoles.includes(RoleEnum.REPORT_VIEWER)) {
    builder.can(Action.View_Report, 'Fleet', { companyId });
  }

  if(userRoles.includes(RoleEnum.REPORT_MANAGER)) {
    builder.can(Action.View_Report, "Fleet", { companyId });
  }
};
