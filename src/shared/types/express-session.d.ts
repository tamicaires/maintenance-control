import 'express-session';
import { TRole } from 'src/infra/http/modules/ability/enums/role.enum';

declare module 'express-session' {
  interface SessionData {
    currentMembership?: {
      userId: string;
      companyId: string;
      roles: TRole[]
    };
  }
}
