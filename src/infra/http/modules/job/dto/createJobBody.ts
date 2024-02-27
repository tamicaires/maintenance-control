import { IsNotEmptyCustom } from "src/infra/http/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "src/infra/http/classValidator/decorators/IsStringCustom";

export class CreateJobBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  jobTitle: string;
}