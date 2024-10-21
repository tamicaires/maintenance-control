import { TRole } from "src/core/enum/role.enum";

export interface SessionData {
  currentMembership?: {
    companyId: string;
    userId: string;
    roles: TRole[];
  };
}
