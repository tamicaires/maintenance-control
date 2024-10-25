import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';

export class AssignUserToRoleBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  userId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  rolesIds: string[];
}
