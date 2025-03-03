import { IsDateString } from "class-validator";
import { IsDateCustom } from "src/core/classValidator/decorators/IsDateCustom";
import { IsNotEmptyCustom } from "src/core/classValidator/decorators/IsNotEmptyCustom";

export class GetQueueChartQuery {
  @IsDateString()
  @IsNotEmptyCustom()
  currentDate: string;
}