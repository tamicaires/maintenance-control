import { IsArray } from 'class-validator';
import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';
import { TRole } from 'src/core/enum/role.enum';

export class CreateMembershipBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  userId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  companyId: string;

  @IsArray()
  @IsNotEmptyCustom()
  role: TRole[];
}
