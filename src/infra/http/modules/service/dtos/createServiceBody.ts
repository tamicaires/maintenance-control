import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { ServiceCategory } from 'src/modules/service/enum/service-category.enum';

export class CreateServiceBody {
  @IsNotEmptyCustom()
  @IsStringCustom()
  serviceName: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  serviceCategory: ServiceCategory;
}
