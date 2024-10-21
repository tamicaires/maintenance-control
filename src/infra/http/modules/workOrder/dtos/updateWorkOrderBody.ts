import { IsDateString, IsOptional } from 'class-validator';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { Box } from 'src/core/enum/box.enum';
import { MaintenanceStatus } from 'src/core/enum/maitenance-status.enum';
import { TypeOfMaintenance } from 'src/core/enum/type-of-maintenance.enum';

export class UpdateWorkOrderBody {
  @IsStringCustom()
  @IsOptional()
  severityLevel: string;

  @IsDateString()
  @IsOptional()
  entryQueue: Date;

  @IsDateString()
  @IsOptional()
  entryMaintenance: Date;

  @IsDateString()
  @IsOptional()
  exitMaintenance: Date;

  @IsDateString()
  @IsOptional()
  startWaitingParts: Date;

  @IsDateString()
  @IsOptional()
  endWaitingParts: Date;

  @IsStringCustom()
  @IsOptional()
  status: MaintenanceStatus;

  @IsStringCustom()
  @IsOptional()
  fleetId: string;

  @IsStringCustom()
  @IsOptional()
  typeOfMaintenance: TypeOfMaintenance;

  @IsStringCustom()
  @IsOptional()
  box: Box;

  @IsStringCustom()
  @IsOptional()
  exitSupervisor: string;
}
