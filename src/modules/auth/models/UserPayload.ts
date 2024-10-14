export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  companyId: string | null;
  createdAt?: string;
  updatedAt?: string;
}
