import { IsBoolean } from "class-validator";
import { IsNotEmptyCustom } from "src/core/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/core/classValidator/decorators/IsStringCustom";

export class CreateChecklistItemDTO {
  @IsStringCustom()
  @IsNotEmptyCustom()
  checklistId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  itemTemplateId: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  checklistCategoryId: string;

  @IsBoolean()
  @IsNotEmptyCustom()
  isConform: boolean;
}