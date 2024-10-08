import { IsOptional } from 'class-validator';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class UpdateServiceAssignmentBody {
  @IsStringCustom()
  @IsOptional()
  workOrderId: string;

  @IsStringCustom()
  @IsOptional()
  serviceId: string;

  @IsStringCustom()
  @IsOptional()
  employeeId: string;
}
