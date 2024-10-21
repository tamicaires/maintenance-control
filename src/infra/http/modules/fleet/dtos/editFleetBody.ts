import { IsBoolean, IsOptional } from 'class-validator';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
export class EditFleetBody {
  @IsStringCustom()
  @IsOptional()
  fleetNumber: string;

  @IsStringCustom()
  @IsOptional()
  plate: string;

  @IsStringCustom()
  @IsOptional()
  firstTrailerPlate: string;

  @IsStringCustom()
  @IsOptional()
  secondTrailerPlate: string;

  @IsStringCustom()
  @IsOptional()
  thirdTrailerPlate: string;

  @IsStringCustom()
  @IsOptional()
  km: string;

  @IsStringCustom()
  @IsOptional()
  carrierId: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
