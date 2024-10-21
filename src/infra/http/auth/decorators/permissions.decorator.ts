import { SetMetadata } from '@nestjs/common';
import { Action } from '../../ability/ability';
import { TSubject } from 'src/core/enum/subject.enum';

export const PERMISSION_KEY = 'permission';
export const Permission = (action: Action, subject: TSubject) => SetMetadata(PERMISSION_KEY, { action, subject });
