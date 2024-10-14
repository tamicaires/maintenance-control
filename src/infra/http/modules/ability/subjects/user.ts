import { Action } from "../ability";
import { AbilityBuilder } from "../abilityBuilder";
import { RoleEnum, TRole } from "../enums/role.enum";

export const defineUserAbilities = (builder: AbilityBuilder, companyId: string, userRoles: TRole[]) => {
  if(userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'User', { companyId });
  }

  if(userRoles.includes(RoleEnum.GENERAL_VIEWER)) {
    builder.can(Action.Read, 'User', { companyId });
  }
};
