import { IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';
import { TServiceAssigmentStatus } from 'src/core/enum/service-assigment-status';

export class CreateServiceAssignmentBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  workOrderId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  serviceId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  trailerId: string;
  
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
