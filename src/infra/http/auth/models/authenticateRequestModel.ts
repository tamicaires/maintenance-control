import { Request } from 'express';
import { SessionData } from './sessionModel';

export class AuthenticatedRequestModel extends Request {
  user: {
    id: string;
    name: string;
    email: string;
    companyId: string;
    createdAt: string;
    updatedAt: string;
  };
  session: SessionData;
}
