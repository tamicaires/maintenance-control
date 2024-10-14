import { IsNumber, IsOptional } from "class-validator";
import { IsNotEmptyCustom } from "src/infra/http/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/infra/http/classValidator/decorators/IsStringCustom";
import { TAxle } from "src/modules/axle/enum/axle.enum";

export class CreateAxleBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  position: string;

  @IsNumber()
  @IsOptional()
  capacity: number | null;

  @IsStringCustom()
  @IsNotEmptyCustom()
  type: TAxle;

  @IsStringCustom()
  @IsNotEmptyCustom()
  trailerId: string;
}