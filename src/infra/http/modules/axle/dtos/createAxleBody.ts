import { IsNumber, IsOptional } from "class-validator";
import { TAxle } from "src/core/enum/axle.enum";
import { IsNotEmptyCustom } from "src/infra/http/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/infra/http/classValidator/decorators/IsStringCustom";

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