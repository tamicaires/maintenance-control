import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class AssociateUserToCompanyBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  companyId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  userId: string;
}
