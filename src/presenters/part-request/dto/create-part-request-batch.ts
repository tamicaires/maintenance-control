import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer'; // Importar Type para usar a transformação
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';
import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsNumber } from 'class-validator'; // Importar IsNumber diretamente
import { TRequestStatus } from 'src/core/enum/part-request';

class PartRequestBatchItem {
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

  @IsStringCustom()
  @IsNotEmptyCustom()
  status: TRequestStatus;

  @IsStringCustom()
  @IsOptional()
  axleId: string | null;

  @IsStringCustom()
  @IsOptional()
  trailerId: string | null;

  @IsStringCustom()
  @IsNotEmptyCustom()
  workOrderId: string;
}

export class CreatePartRequestBatchBody {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartRequestBatchItem)
  batchData: PartRequestBatchItem[];
}
