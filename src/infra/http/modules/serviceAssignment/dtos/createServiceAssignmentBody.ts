import { IsNotEmptyCustom } from "src/infra/http/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/infra/http/classValidator/decorators/IsStringCustom";

export class CreateServiceAssignmentBody {

  @IsStringCustom()
  @IsNotEmptyCustom()
  workOrderId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  serviceId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  employeeId: string;
};