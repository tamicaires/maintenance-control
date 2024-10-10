import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { TRole } from 'src/modules/role/enum/role.enum';

export class CreateRoleBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  name: TRole;

}
