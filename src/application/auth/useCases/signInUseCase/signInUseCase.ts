import { Injectable } from '@nestjs/common';
import { UserPayload } from '../../models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/domain/entities/user';

interface SignInRequest {
  user: User
}

@Injectable()
export class SignInUseCase {
  constructor(private jwtService: JwtService) { }

  async execute({ user }: SignInRequest) {
    const payload: UserPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toJSON(),
      updatedAt: user.updatedAt.toJSON(),
    };

    const jwtToken = this.jwtService.sign(payload);

    return jwtToken;
  }
}
