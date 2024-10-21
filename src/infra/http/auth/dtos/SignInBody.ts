
import { IsEmailCustom } from 'src/core/classValidator/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';
import { MinLengthCustom } from 'src/core/classValidator/decorators/MinLengthCustom';

export class SignInBody {
  @IsNotEmptyCustom()
  @IsStringCustom()
  @IsEmailCustom()
  email: string;

  @IsNotEmptyCustom()
  @MinLengthCustom(4)
  password: string;
}
