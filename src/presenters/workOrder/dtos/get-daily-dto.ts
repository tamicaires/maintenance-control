import { IsDateString } from "class-validator";
import { IsNotEmptyCustom } from "src/core/classValidator/decorators/IsNotEmptyCustom";

export class GetDailyQueriesDTO {
  @IsDateString()
  @IsNotEmptyCustom()
  startDate: string

  @IsDateString()
  @IsNotEmptyCustom()
  endDate: string
}