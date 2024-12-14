import { IsDateString } from "class-validator";
import { IsNotEmptyCustom } from "src/core/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/core/classValidator/decorators/IsStringCustom";
import { MaintenanceStatus } from "src/core/enum/maitenance-status.enum";

export class StartWaitingPartsDto {
  @IsStringCustom()
  @IsNotEmptyCustom()
  status: MaintenanceStatus;

  @IsDateString()
  @IsNotEmptyCustom()
  startWaitingParts: Date;
}