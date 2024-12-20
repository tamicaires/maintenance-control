import { IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';

export class CreateNoteBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  content: string;

  @IsStringCustom()
  @IsOptional()
  description?: string;

}
