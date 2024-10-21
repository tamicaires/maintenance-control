import { IsOptional } from 'class-validator';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { ServiceCategory } from 'src/core/enum/service-category.enum';

export class UpdateServiceBody {
  @IsOptional()
  @IsStringCustom()
  serviceName: string;

  @IsOptional()
  @IsStringCustom()
  serviceCategory: ServiceCategory;
}
