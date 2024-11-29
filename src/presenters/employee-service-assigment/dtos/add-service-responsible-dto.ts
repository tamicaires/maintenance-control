import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';

export class AddEmployeeServiceAssigmentDto {
  @IsStringCustom()
  @IsNotEmptyCustom()
  serviceAssigmentId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  employeeId: string;
}
