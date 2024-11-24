import { IsOptional } from 'class-validator';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';
import { TServiceAssigmentStatus } from 'src/core/enum/service-assigment-status';

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

  @IsStringCustom()
  @IsOptional()
  status: TServiceAssigmentStatus;

  @IsStringCustom()
  @IsOptional()
  startAt: Date | null;

  @IsStringCustom()
  @IsOptional()
  endAt: Date | null;
}
