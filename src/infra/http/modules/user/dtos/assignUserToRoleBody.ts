import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class AssignUserToRoleBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  userId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  rolesIds: string[];
}
