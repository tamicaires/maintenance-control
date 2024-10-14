// import { SetMetadata } from '@nestjs/common';
// import { Rule } from '../../ability/ability';

// export const Permissions = (...permissions: Rule[]) => SetMetadata('permissions', permissions);


import { SetMetadata } from '@nestjs/common';
import { Action } from '../../ability/ability';
import { TSubject } from '../../ability/enums/subject.enum';


// Define a permission metadata
export const PERMISSION_KEY = 'permission';
export const Permission = (action: Action, subject: TSubject) => SetMetadata(PERMISSION_KEY, { action, subject });
