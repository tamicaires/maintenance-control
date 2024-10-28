import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import { IsNotEmptyCustom } from "src/core/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/core/classValidator/decorators/IsStringCustom";
import { TRequestStatus } from "src/core/enum/part-request";

export class PartRequestBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  partId: string;

  @IsStringCustom()
  @IsOptional()
  requestedForEmployeeId: string | null;

  @IsStringCustom()
  @IsOptional()
  handledById: string | null;

  @IsNumber()
  @IsNotEmptyCustom()
  quantity: number;

  @IsNumber()
  @IsOptional()
  approvedQuantity: number | null;

  @IsStringCustom()
  @IsNotEmptyCustom()
  status: TRequestStatus;

  @IsBoolean()
  @IsNotEmptyCustom()
  isRejected: boolean;

  @IsStringCustom()
  @IsOptional()
  workOrderId: string | null;
}