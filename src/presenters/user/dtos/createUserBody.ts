import { IsArray, IsOptional } from 'class-validator';
import { IsEmailCustom } from 'src/core/classValidator/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';
import { MinLengthCustom } from 'src/core/classValidator/decorators/MinLengthCustom';

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
}
