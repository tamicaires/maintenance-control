import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import { IsNotEmptyCustom } from "src/core/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/core/classValidator/decorators/IsStringCustom";

export class CreateTrailerBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  plate: string;

  @IsNumber()
  @IsNotEmptyCustom()
  position: number;

  @IsStringCustom()
  @IsOptional()
  fleetId: string | null;

  @IsBoolean()
  @IsNotEmptyCustom()
  isActive: boolean;
}