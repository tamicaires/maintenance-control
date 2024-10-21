import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';

export class AssociateUserToCompanyBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  companyId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  userId: string;
}
