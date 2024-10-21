import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModel/userViewModel';
import { Public } from '../auth/decorators/is-public.decorator';
import { CreateUser } from 'src/domain/user/useCases/createUser';
import { ListUsers } from 'src/domain/user/useCases/listUsers';
import { GetUserWithRoles } from 'src/domain/user/useCases/getUserWithRoles';

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
