import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUser } from 'src/modules/user/useCases/createUser';
import { CreateUserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModel/userViewModel';
import { Public } from '../auth/decorators/is-public.decorator';
import { AssociateUserToCompanyBody } from './dtos/associateUserToCompanyBody';
import { GetUserWithRoles } from 'src/modules/user/useCases/getUserWithRoles';
import { ListUsers } from 'src/modules/user/useCases/listUsers';

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
