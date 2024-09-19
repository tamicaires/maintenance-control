import { IsBoolean } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

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
