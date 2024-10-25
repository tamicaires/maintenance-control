import { IsBoolean, IsOptional } from 'class-validator';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';
export class EditFleetBody {
  @IsStringCustom()
  @IsOptional()
  fleetNumber: string;

  @IsStringCustom()
  @IsOptional()
  carrierId: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
