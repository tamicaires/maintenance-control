import { IsBoolean, IsOptional } from 'class-validator';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';

export class EditCarrierBody {
  @IsStringCustom()
  @IsOptional()
  carrierName: string;

  @IsStringCustom()
  @IsOptional()
  managerName: string;

  @IsStringCustom()
  @IsOptional()
  managerPhone: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
