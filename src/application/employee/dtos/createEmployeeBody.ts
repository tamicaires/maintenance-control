import { IsBoolean } from 'class-validator';
import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';

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
