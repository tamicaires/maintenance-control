import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';

export class EditJobBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  jobTitle: string;
}
