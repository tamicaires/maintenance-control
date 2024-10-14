import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUser } from 'src/modules/user/useCases/createUser';
import { CreateUserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModel/userViewModel';
import { Public } from '../auth/decorators/is-public.decorator';
import { AssociateUserToCompanyBody } from './dtos/associateUserToCompanyBody';
import { AssociateUserToCompany } from 'src/modules/company/useCases/associateUserToCompany.use-case';
import { AssignUserToRoleBody } from './dtos/assignUserToRoleBody';
import { GetUserWithRoles } from 'src/modules/user/useCases/getUserWithRoles';
import { ListUsers } from 'src/modules/user/useCases/listUsers';

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUser,
    private readonly listUsersUseCase: ListUsers,
    private readonly associateUserToCompanyUseCase: AssociateUserToCompany,
    private readonly getUserWithRoles: GetUserWithRoles,
  ) { }

  @Public()
  @Post()
  async createUser(
    @Body() body: CreateUserBody,
  ) {
    const { email, password, name, companyId } = body;
    const user = await this.createUserUseCase.execute({
      email,
      password,
      name,
      companyId,
    });

    return UserViewModel.toHttp(user);
  }

  @Get()
  async listUsers() {
    return await this.listUsersUseCase.execute();
  }

  @Post("/associate-company")
  async associateUserToCompany(@Body() body: AssociateUserToCompanyBody) {
    return await this.associateUserToCompanyUseCase.execute(body);
  }

  @Get("/:userId")
  async getUserWithRole(@Param("userId") userId: string) {
    return await this.getUserWithRoles.execute(userId);
  }


}
