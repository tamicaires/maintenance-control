import { IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/core/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from 'src/core/classValidator/decorators/IsStringCustom';

export class EditNoteBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  title: string;

  @IsStringCustom()
  @IsOptional()
  description: string;
}
