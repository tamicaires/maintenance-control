import { IsOptional } from "class-validator";
import { IsDateCustom } from "src/infra/http/classValidator/decorators/IsDateCustom";
import { IsNotEmptyCustom } from "src/infra/http/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/infra/http/classValidator/decorators/IsStringCustom";
import { Box } from "src/modules/workOrder/enum/box.enum";
import { MaintenanceStatus } from "src/modules/workOrder/enum/maitenance-status.enum";
import { TypeOfMaintenance } from "src/modules/workOrder/enum/type-of-maintenance.enum";

export class CreateWorkOrderBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  severityLevel: string;

  @IsDateCustom()
  @IsOptional()
  entryQueue: Date;

  @IsDateCustom()
  @IsOptional()
  entryMaintenance: Date;

  @IsDateCustom()
  @IsOptional()
  exitMaintenance: Date;

  @IsStringCustom()
  @IsNotEmptyCustom()
  status: MaintenanceStatus;

  @IsNotEmptyCustom()
  fleetId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  typeOfMaintenance: TypeOfMaintenance;

  @IsStringCustom()
  @IsOptional()
  box: Box;
};