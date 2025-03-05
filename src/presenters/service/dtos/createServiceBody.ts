import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';
import { ServiceCategory } from 'src/core/enum/service-category.enum';

export class CreateServiceBody {
  @IsNotEmptyCustom()
  @IsStringCustom()
  serviceName: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  serviceCategory: ServiceCategory;

  @IsNotEmptyCustom()
  @IsStringCustom()
  weight: number;
}