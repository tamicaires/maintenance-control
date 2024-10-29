import { IsBoolean, IsDateString, IsOptional } from 'class-validator';
import { IsDateCustom } from 'src/core/classValidator/decorators/IsDateCustom';
import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';
import { MaintenanceStatus } from 'src/core/enum/maitenance-status.enum';
import { TypeOfMaintenance } from 'src/core/enum/type-of-maintenance.enum';

export class CreateWorkOrderBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  severityLevel: string;

  @IsDateString()
  @IsOptional()
  entryQueue: Date;

  @IsDateString()
  @IsOptional()
  entryMaintenance: Date;

  @IsDateCustom()
  @IsOptional()
  exitMaintenance: Date;

  @IsStringCustom()
  @IsNotEmptyCustom()
  status: MaintenanceStatus;

  @IsStringCustom()
  @IsNotEmptyCustom()
  fleetId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  typeOfMaintenance: TypeOfMaintenance;

  @IsStringCustom()
  @IsOptional()
  boxId: string | null;

  @IsBoolean()
  @IsNotEmptyCustom()
  isCancelled: boolean;
}
