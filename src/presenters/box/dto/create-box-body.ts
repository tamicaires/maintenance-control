import { IsBoolean, IsOptional } from "class-validator";
import { IsNotEmptyCustom } from "src/core/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/core/classValidator/decorators/IsStringCustom";

export class CreateBoxBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string;

  @IsStringCustom()
  @IsOptional()
  description: string | null;

  @IsBoolean()
  @IsNotEmptyCustom()
  isActive: boolean;
}