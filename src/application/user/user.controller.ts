import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModel/userViewModel';
import { CreateUser } from 'src/domain/user/useCases/createUser';
import { ListUsers } from 'src/domain/user/useCases/listUsers';
import { GetUserWithRoles } from 'src/domain/user/useCases/getUserWithRoles';
import { Public } from 'src/infra/http/auth/decorators/is-public.decorator';

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUser,
    private readonly listUsersUseCase: ListUsers,
    private readonly getUserWithRoles: GetUserWithRoles,
  ) { }

  @Public()
  @Post()
  async createUser(
    @Body() body: CreateUserBody,
  ) {
    const { email, password, name } = body;
    const user = await this.createUserUseCase.execute({
      email,
      password,
      name,
    });

    return UserViewModel.toHttp(user);
  }

  @Get()
  async listUsers() {
    return await this.listUsersUseCase.execute();
  }

  @Get("/:userId")
  async getUserWithRole(@Param("userId") userId: string) {
    return await this.getUserWithRoles.execute(userId);
  }


}
