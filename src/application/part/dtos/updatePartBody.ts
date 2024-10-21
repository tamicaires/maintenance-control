import { IsNumber, IsOptional } from "class-validator";
import { IsStringCustom } from "src/infra/http/classValidator/decorators/IsStringCustom";
import { TPartLocation, TPartStatus } from "src/core/enum/part.enum";

export class UpdatePartBody {
  @IsStringCustom()
  @IsOptional()
  name: string;

  @IsStringCustom()
  @IsOptional()
  description: string | null;

  @IsStringCustom()
  @IsOptional()
  partNumber: string;

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
  @IsOptional()
  costPrice: number;

  @IsStringCustom()
  @IsOptional()
  sellingPrice: number | null;

  @IsNumber()
  @IsOptional()
  stockQuantity: number;

  @IsStringCustom()
  @IsOptional()
  location: TPartLocation;

  @IsStringCustom()
  @IsOptional()
  status: TPartStatus;

  @IsStringCustom()
  @IsOptional()
  categoryId: string;

  @IsStringCustom()
  @IsOptional()
  trailerId: string | null;

  @IsStringCustom()
  @IsOptional()
  axleId: string | null;
}