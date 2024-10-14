import { User } from 'src/modules/user/entities/User';
import { SessionData } from './sessionModel';

export class AuthRequestModel extends Request {
  user: User
  session: SessionData
}
