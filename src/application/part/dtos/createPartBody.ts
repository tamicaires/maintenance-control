import { IsNumber, IsOptional } from "class-validator";
import { IsNotEmptyCustom } from "src/core/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/core/classValidator/decorators/IsStringCustom";
import { TPartLocation, TPartStatus } from "src/core/enum/part.enum";

export class CreatePartBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string;

  @IsStringCustom()
  @IsOptional()
  description: string | null;

  @IsStringCustom()
  @IsNotEmptyCustom()
  partNumber: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  serialNumber: string;

  @IsStringCustom()
  @IsOptional()
  model: string | null;

  @IsStringCustom()
  @IsOptional()
  brand: string | null;

  @IsStringCustom()
  @IsOptional()
  supplier: string | null;

  @IsNumber()
  @IsNotEmptyCustom()
  costPrice: number;

  @IsStringCustom()
  @IsOptional()
  sellingPrice: number | null;

  @IsNumber()
  @IsNotEmptyCustom()
  stockQuantity: number;

  @IsStringCustom()
  @IsNotEmptyCustom()
  location: TPartLocation;

  @IsStringCustom()
  @IsNotEmptyCustom()
  status: TPartStatus;

  @IsStringCustom()
  @IsNotEmptyCustom()
  categoryId: string;

  @IsStringCustom()
  @IsOptional()
  trailerId: string | null;

  @IsStringCustom()
  @IsOptional()
  axleId: string | null;
}