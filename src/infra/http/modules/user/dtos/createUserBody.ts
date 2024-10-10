import { IsArray, IsOptional } from 'class-validator';
import { IsEmailCustom } from 'src/infra/http/classValidator/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidator/decorators/MinLengthCustom';
import { RoleEnum } from 'src/modules/role/enum/role.enum';
import { Role } from 'src/modules/user/enum/Roles';

export class CreateUserBody {
  @IsStringCustom()
  @IsEmailCustom()
  @IsNotEmptyCustom()
  email: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  @MinLengthCustom(6)
  password: string;

  @IsArray() 
  @IsNotEmptyCustom()
  rolesIds: string[];

  @IsStringCustom()
  @IsOptional()
  companyId: string;
}
