import { IsBoolean } from 'class-validator';
import { IsEmailCustom } from 'src/infra/http/classValidator/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';

export class CreateCompanyBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  cnpj: string;

  @IsEmailCustom()
  @IsNotEmptyCustom()
  email: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  phone: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  address: string;
}
