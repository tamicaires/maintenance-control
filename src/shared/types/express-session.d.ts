import 'express-session';
import { TRole } from 'src/core/enum/role.enum';

declare module 'express-session' {
  interface SessionData {
    currentMembership?: {
      userId: string;
      companyId: string;
      roles: TRole[]
    };
  }
}
