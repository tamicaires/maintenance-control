import { IsBoolean, IsNumber } from "class-validator";
import { IsNotEmptyCustom } from "src/infra/http/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/infra/http/classValidator/decorators/IsStringCustom";

export class CreateTrailerBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  plate: string;

  @IsNumber()
  @IsNotEmptyCustom()
  position: number;

  @IsStringCustom()
  @IsNotEmptyCustom()
  fleetId: string;

  @IsBoolean()
  @IsNotEmptyCustom()
  isActive: boolean;
}