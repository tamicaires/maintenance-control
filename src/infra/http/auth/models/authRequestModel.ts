import { User } from 'src/core/domain/entities/user';
import { SessionData } from './sessionModel';

export class AuthRequestModel extends Request {
  user: User
  session: SessionData

}
