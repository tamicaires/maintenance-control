import { TRole } from 'src/core/enum/role.enum';
import { AbilityBuilder } from './abilityBuilder';
import { defineCompanyAbilities } from './subjects/company';
import { defineUserAbilities } from './subjects/user';
import { defineCarrierAbilities } from './subjects/carrier';
import { defineFleetAbilities } from './subjects/fleet';
import { defineAxleAbilities } from './subjects/axle';
import { defineBoxAbilities } from './subjects/box';
import { defineChecklistAbilities } from './subjects/checklist';
import { defineEmployeeAbilities } from './subjects/employee';
import { defineEventAbilities } from './subjects/event';
import { defineJobAbilities } from './subjects/job';
import { defineMembershipAbilities } from './subjects/membership';
import { defineNoteAbilities } from './subjects/note';
import { definePartAbilities } from './subjects/part';
import { definePartCategoryAbilities } from './subjects/part-category';
import { defineServiceAbilities } from './subjects/services';
import { defineServiceAssigmentAbilities } from './subjects/service-assigment';
import { defineTireAbilities } from './subjects/tire';
import { defineTrailerAbilities } from './subjects/trailer';
import { defineVehicleAbilities } from './subjects/vehicle';
import { defineWorkOrderAbilities } from './subjects/work-order';


export const defineAbilitiesForUser = (
  userId: string,
  companyId: string,
  roles: TRole[]
) => {
  const builder = new AbilityBuilder();

  defineAxleAbilities(builder, companyId, roles);
  defineBoxAbilities(builder, companyId, roles);
  defineCarrierAbilities(builder, userId, companyId, roles);
  defineChecklistAbilities(builder, companyId, roles);
  defineCompanyAbilities(builder, userId, companyId, roles);
  defineEmployeeAbilities(builder, companyId, roles);
  defineEventAbilities(builder, companyId, roles);
  defineFleetAbilities(builder, companyId, roles);
  defineJobAbilities(builder, companyId, roles);
  defineMembershipAbilities(builder, companyId, roles);
  defineNoteAbilities(builder, companyId, roles);
  definePartAbilities(builder, companyId, roles);
  definePartCategoryAbilities(builder, companyId, roles);
  defineServiceAbilities(builder, companyId, roles);
  defineServiceAssigmentAbilities(builder, companyId, roles);
  defineUserAbilities(builder, companyId, roles);
  defineTireAbilities(builder, companyId, roles);
  defineTrailerAbilities(builder, companyId, roles);
  defineVehicleAbilities(builder, companyId, roles);
  defineWorkOrderAbilities(builder, companyId, roles);

  return builder.build();
};
