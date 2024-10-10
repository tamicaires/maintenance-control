import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUser } from 'src/modules/user/useCases/createUser';
import { CreateUserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModel/userViewModel';
import { Public } from '../auth/decorators/is-public.decorator';
import { AuthenticatedRequestModel } from '../auth/models/authenticateRequestModel';
import { AssociateUserToCompanyBody } from './dtos/associateUserToCompanyBody';
import { AssociateUserToCompany } from 'src/modules/company/useCases/associateUserToCompany.use-case';
import { AssignUserToRole } from 'src/modules/user/useCases/assignUserToRole';
import { AssignUserToRoleBody } from './dtos/assignUserToRoleBody';
import { GetUserWithRoles } from 'src/modules/user/useCases/getUserWithRoles';

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUser,
    private readonly associateUserToCompanyUseCase: AssociateUserToCompany,
    private readonly assignUserToRoleUseCase: AssignUserToRole,
    private readonly getUserWithRoles: GetUserWithRoles,
  ) { }

  @Public()
  @Post()
  async createUser(
    @Body() body: CreateUserBody,
    @Request() request: AuthenticatedRequestModel,
  ) {
    const { email, password, name, rolesIds, companyId } = body;
    console.log("request", request.user);
    const user = await this.createUserUseCase.execute({
      email,
      password,
      name,
      rolesIds,
      companyId,
    });

    return UserViewModel.toHttp(user);
  }

  @Post("/associate-company")
  async associateUserToCompany(@Body() body: AssociateUserToCompanyBody) {
    return await this.associateUserToCompanyUseCase.execute(body);
  }

  @Post("/assign-role")
  async assignUserToRole(@Body() body: AssignUserToRoleBody) {
    return await this.assignUserToRoleUseCase.execute(body);
  }

  @Get("/:userId")
  async getUserWithRole(@Param("userId") userId: string) {
    const user = await this.getUserWithRoles.execute(userId);

    return UserViewModel.toHttpWithRoles(user);
  }


}
