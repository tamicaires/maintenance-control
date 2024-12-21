import { IsNotEmptyCustom } from "src/core/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/core/classValidator/decorators/IsStringCustom";

export class CreateChecklistDTO {
  @IsStringCustom()
  @IsNotEmptyCustom()
  workOrderId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  templateId: string;
}