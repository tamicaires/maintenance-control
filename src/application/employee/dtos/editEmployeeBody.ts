import { IsOptional } from 'class-validator';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';

export class EditEmployeeBody {
  @IsOptional()
  @IsStringCustom()
  name: string;

  @IsOptional()
  @IsStringCustom()
  workShift: string;

  @IsOptional()
  @IsStringCustom()
  jobTitleId: string;

  @IsOptional()
  @IsStringCustom()
  isActive: boolean;
}
