import { IsDateString, IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';
import { TServiceAssigmentStatus } from 'src/core/enum/service-assigment-status';

export class ChangeStatusDto {
  @IsStringCustom()
  @IsNotEmptyCustom()
  status: TServiceAssigmentStatus;

  @IsDateString()
  @IsOptional()
  startAt: Date | null;

  @IsDateString()
  @IsOptional()
  endAt: Date | null;
}
