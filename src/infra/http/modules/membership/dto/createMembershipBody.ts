import { IsArray } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { TRole } from 'src/infra/http/modules/ability/enums/role.enum';

export class CreateMembershipBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  userId: string;

  @IsArray()
  @IsNotEmptyCustom()
  roles: TRole[];
}
