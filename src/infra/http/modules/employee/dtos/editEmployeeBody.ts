import { IsOptional } from "class-validator";
import { IsStringCustom } from "src/infra/http/classValidator/decorators/IsStringCustom";
import { EmployeeStatus } from "src/modules/employee/enum/employee-status.enum";

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
  status: EmployeeStatus;

};