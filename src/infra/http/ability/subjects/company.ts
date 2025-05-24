import { RoleEnum } from "src/core/enum/role.enum";
import { Action } from "../ability";
import { AbilityBuilder } from "../abilityBuilder";

export const defineCompanyAbilities = (builder: AbilityBuilder, userId: string, companyId: string, userRoles: string[]) => {
  builder.can(Action.Read, 'Company', { companyId });

  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Manage, 'Company', { companyId });
  }
  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Manage, 'Company', { companyId });
  }
};
