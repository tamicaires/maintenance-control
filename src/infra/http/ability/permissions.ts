import { TRole } from 'src/core/enum/role.enum';
import { AbilityBuilder } from './abilityBuilder';
import { defineCompanyAbilities } from './subjects/company';
import { defineUserAbilities } from './subjects/user';
import { defineCarrierAbilities } from './subjects/carrier';
import { defineFleetAbilities } from './subjects/fleet';


export const defineAbilitiesForUser = (
  userId: string, 
  companyId: string, 
  roles: TRole[]
) => {
  const builder = new AbilityBuilder();

  defineCompanyAbilities(builder, userId, companyId, roles);
  defineUserAbilities(builder, companyId, roles);
  defineCarrierAbilities(builder, userId, companyId, roles);
  defineFleetAbilities(builder, companyId, roles);
  
  return builder.build();
};
