import { Role } from "src/modules/role/entities/Role";

export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  roles: Role[];
  companyId: string | null;
  createdAt?: string;
  updatedAt?: string;
}
