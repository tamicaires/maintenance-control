import { TRole } from "../../ability/enums/role.enum";

export interface SessionData {
  currentMembership?: {
    companyId: string;
    userId: string;
    roles: TRole[];
  };
}
