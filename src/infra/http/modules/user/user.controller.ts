import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUser } from 'src/modules/user/useCases/createUser';
import { CreateUserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModel/userViewModel';
import { Role } from '../auth/decorators/roles.decorator';
import { AuthorizationGuard } from '../auth/guards/authorization.guard';
import { Public } from '../auth/decorators/is-public.decorator';

@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUser) {}

  @Public()
  @Post()
  async createUser(@Body() body: CreateUserBody) {
    const { email, password, name, role } = body;

    const user = await this.createUserUseCase.execute({
      email,
      password,
      name,
      role,
    });

    return UserViewModel.toHttp(user);
  }
}
