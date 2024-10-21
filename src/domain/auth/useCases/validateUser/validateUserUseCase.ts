import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { AuthValuesIncorretException } from '../../exceptions/AuthValuesIncorrectExceptions';
import { UserRepository } from 'src/domain/user/repositories/UserRepository';

interface ValidateUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({ email, password }: ValidateUserRequest) {
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) throw new AuthValuesIncorretException();

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) throw new AuthValuesIncorretException();

    const userAutenticated = await this.userRepository.findUserWithRole(user.id);
    return userAutenticated;
  }
}
