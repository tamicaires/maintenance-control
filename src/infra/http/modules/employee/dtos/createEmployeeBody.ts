import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { EmployeeStatus } from 'src/modules/employee/enum/employee-status.enum';

export class CreateEmployeeBody {
  @IsNotEmptyCustom()
  @IsStringCustom()
  name: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  workShift: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  jobTitleId: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  status: EmployeeStatus;
}
