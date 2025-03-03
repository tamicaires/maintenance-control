import { IsNumber } from "class-validator";
import { IsNotEmptyCustom } from "src/core/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/core/classValidator/decorators/IsStringCustom";

export class CreateChecklistTemplateItemDTO {
  @IsStringCustom()
  @IsNotEmptyCustom()
  description: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  templateId: string;

  @IsNumber()
  @IsNotEmptyCustom()
  weight: number;

  @IsStringCustom()
  @IsNotEmptyCustom()
  checklistCategoryId: string;
}