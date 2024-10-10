import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/User';
import { UserPayload } from '../../models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/modules/role/entities/Role';
import { UserWithRoles } from 'src/types/user.interface';

interface SignInRequest extends UserWithRoles{
  
}

@Injectable()
export class SignInUseCase {
  constructor(private jwtService: JwtService) { }

  async execute(user: SignInRequest) {
    const payload: UserPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      companyId: user.companyId,
      roles: user.roles,
      createdAt: user.createdAt.toJSON(),
      updatedAt: user.updatedAt.toJSON(),
    };

    const jwtToken = this.jwtService.sign(payload);

    return jwtToken;
  }
}
