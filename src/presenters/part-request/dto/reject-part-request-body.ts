import { IsOptional } from "class-validator";
import { IsNotEmptyCustom } from "src/core/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/core/classValidator/decorators/IsStringCustom";

export class RejectPartRequestBody {
  @IsStringCustom()
  @IsOptional()
  rejectionReason: string | null;
}