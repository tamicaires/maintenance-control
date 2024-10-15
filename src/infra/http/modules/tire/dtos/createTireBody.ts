import { IsNumber, isNumber, IsOptional } from "class-validator";
import { IsNotEmptyCustom } from "src/infra/http/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/infra/http/classValidator/decorators/IsStringCustom";
import { TTireCondition, TTireLocation } from "src/modules/tire/enum/tire.enum";

export class CreateTireBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  brand: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  serialNumber: string;

  @IsStringCustom()
  @IsOptional()
  axleId: string | null;

  @IsStringCustom()
  @IsNotEmptyCustom()
  status: TTireCondition;

  @IsNumber()
  @IsOptional()
  treadDepth: number | null;

  @IsStringCustom()
  @IsOptional()
  treadPattern: string | null;

  @IsNumber()
  @IsOptional()
  wearRating: number | null;

  @IsStringCustom()
  @IsOptional()
  fireNumber: string | null;

  @IsStringCustom()
  @IsNotEmptyCustom()
  location: TTireLocation;
}