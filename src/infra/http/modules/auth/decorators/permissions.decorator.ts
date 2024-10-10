import { SetMetadata } from '@nestjs/common';
import { Rule } from '../../ability/ability.factory';

export const Permissions = (...permissions: Rule[]) => SetMetadata('permissions', permissions);
