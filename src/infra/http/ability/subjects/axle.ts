import { RoleEnum, TRole } from "src/core/enum/role.enum";
import { Action } from "../ability";
import { AbilityBuilder } from "../abilityBuilder";

export const defineAxleAbilities = (
  builder: AbilityBuilder,
  companyId: string,
  userRoles: TRole[]
) => {
  if (userRoles.includes(RoleEnum.SUPER_ADMIN)) {
    builder.can(Action.Read, 'Axle', { companyId });
    builder.can(Action.Create, 'Axle', { companyId });
    builder.can(Action.Update, 'Axle', { companyId });
    builder.can(Action.Delete, 'Axle', { companyId });
    builder.can(Action.View_Report, 'Axle', { companyId });
  }
  if (userRoles.includes(RoleEnum.ADMIN)) {
    builder.can(Action.Read, 'Axle', { companyId });
    builder.can(Action.Create, 'Axle', { companyId });
    builder.can(Action.Update, 'Axle', { companyId });
    builder.can(Action.Delete, 'Axle', { companyId });
    builder.can(Action.View_Report, 'Axle', { companyId });
  }

  if (userRoles.includes(RoleEnum.GENERAL_VIEWER)) {
    builder.can(Action.Read, 'Axle', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_CONSULTANT)) {
    builder.can(Action.Read, 'Axle', { companyId });
    builder.can(Action.Update, 'Axle', { companyId });
  }

  if (userRoles.includes(RoleEnum.MAINTENANCE_MANAGER)) {
    builder.can(Action.Read, 'Axle', { companyId });
    builder.can(Action.Update, 'Axle', { companyId });
    builder.can(Action.Delete, 'Axle', { companyId });
  }
};
