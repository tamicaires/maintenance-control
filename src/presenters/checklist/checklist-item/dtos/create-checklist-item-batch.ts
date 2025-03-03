import { IsStringCustom } from "src/core/classValidator/decorators/IsStringCustom";
import { IsNotEmptyCustom } from "src/core/classValidator/decorators/IsNotEmptyCustom";

export class CreateChecklistItemBatchDto {
  @IsStringCustom()
  @IsNotEmptyCustom()
  checklistId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  templateId: string;
}