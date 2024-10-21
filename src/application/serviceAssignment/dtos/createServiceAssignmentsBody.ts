import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';

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
}
