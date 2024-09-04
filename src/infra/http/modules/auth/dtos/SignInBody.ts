import { IsEmailCustom } from 'src/infra/http/classValidator/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/IsStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidator/decorators/MinLengthCustom';

export class SignInBody {
  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsEmailCustom()
  email: string;

  @IsNotEmptyCustom()
  @MinLengthCustom(4)
  password: string;
}
