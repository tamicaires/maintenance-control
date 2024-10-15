import { IsNumber, IsOptional } from "class-validator";
import { IsStringCustom } from "src/infra/http/classValidator/decorators/IsStringCustom";
import { TTireCondition, TTireLocation } from "src/modules/tire/enum/tire.enum";

export class UpdateTireBody {
  @IsStringCustom()
  @IsOptional()
  brand: string;

  @IsStringCustom()
  @IsOptional()
  serialNumber: string;

  @IsStringCustom()
  @IsOptional()
  axleId: string | null;

  @IsStringCustom()
  @IsOptional()
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
  @IsOptional()
  location: TTireLocation;
}