import { IsBoolean } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

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
  @IsBoolean()
  isActive: boolean;
}
