import { IsNumber } from "class-validator";
import { IsNotEmptyCustom } from "src/core/classValidator/decorators/IsNotEmptyCustom";

export class ApprovePartRequestBody {
  @IsNumber()
  @IsNotEmptyCustom()
  approvedQuantity: number;
}