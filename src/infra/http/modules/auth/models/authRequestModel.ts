
import { User } from 'src/domain/user/entities/User';
import { SessionData } from './sessionModel';

export class AuthRequestModel extends Request {
  user: User
  session: SessionData

}
