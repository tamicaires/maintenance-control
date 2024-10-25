import { IsBoolean } from 'class-validator';
import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';

export class CreateCarrierBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  carrierName: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  managerName: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  managerPhone: string;

  @IsBoolean()
  @IsNotEmptyCustom()
  isActive: boolean;
}
