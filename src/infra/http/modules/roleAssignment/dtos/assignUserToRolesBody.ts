import { IsArray } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class AssignUserToRolesBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  userId: string;

  @IsArray()
  @IsNotEmptyCustom()
  rolesIds: string[];
}
