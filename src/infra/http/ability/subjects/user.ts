import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { Action } from "../ability";
import { AbilityBuilder } from "../abilityBuilder";


export const defineUserAbilities = (builder: AbilityBuilder, companyId: string, userRoles: TRole[]) => {
  if(userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'User', { companyId });
  }
  if(userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'User', { companyId });
  }

  if(userRoles.includes(RoleEnum.GENERAL_VIEWER)) {
    builder.can(Action.Read, 'User', { companyId });
  }
};
