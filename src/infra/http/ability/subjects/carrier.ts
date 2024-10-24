import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { Action } from "../ability";
import { AbilityBuilder } from "../abilityBuilder";

export const defineCarrierAbilities = (
  builder: AbilityBuilder, 
  userId: string, 
  companyId: string, 
  userRoles: TRole[]
) => {
  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Read, 'Carrier', { companyId });
    builder.can(Action.Create, 'Carrier', { companyId });
    builder.can(Action.Update, 'Carrier', { companyId });
    builder.can(Action.Delete, 'Carrier', { companyId });
    builder.can(Action.View_Report, 'Carrier', { companyId });
  }

  if (userRoles.includes(RoleEnum.GENERAL_VIEWER)) {
    builder.can(Action.Read, 'Carrier', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'Carrier', { companyId });
    builder.can(Action.Update, 'Carrier', { companyId });
    builder.cannot(Action.Delete, 'Carrier', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'Carrier', { companyId });
    builder.can(Action.Update, 'Carrier', { companyId });
    builder.can(Action.Delete, 'Carrier', { companyId });
  }

  if (userRoles.includes(RoleEnum.GUEST)) {
    builder.can(Action.Delete, 'Carrier', { companyId });
  }
};
