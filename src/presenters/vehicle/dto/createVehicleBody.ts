import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import { IsNotEmptyCustom } from "src/core/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/core/classValidator/decorators/IsStringCustom";

export class CreateVehicleBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  plate: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  model: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  brand: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  year: string;

  @IsStringCustom()
  @IsOptional()
  color: string | null;

  @IsNumber()
  @IsNotEmptyCustom()
  km: number;

  @IsNumber()
  @IsNotEmptyCustom()
  power: number;

  @IsBoolean()
  @IsNotEmptyCustom()
  isActive: boolean;

  @IsStringCustom()
  @IsNotEmptyCustom()
  fleetId: string;
}