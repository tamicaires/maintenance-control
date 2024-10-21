import { IsBoolean } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidator/decorators/MinLengthCustom';

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
