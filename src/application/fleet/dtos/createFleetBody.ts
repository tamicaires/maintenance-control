import { IsBoolean } from 'class-validator';
import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';
import { MinLengthCustom } from 'src/core/classValidator/decorators/MinLengthCustom';

export class CreateFleetBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  @MinLengthCustom(5)
  fleetNumber: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  plate: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  km: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  carrierId: string;

  @IsBoolean()
  @IsNotEmptyCustom()
  isActive: boolean;
}
