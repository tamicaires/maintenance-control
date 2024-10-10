import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateRole } from "src/modules/role/useCase/createRole";
import { CreateRoleBody } from "./dtos/createUserBody";
import { Role } from "src/modules/role/entities/Role";
import { GetManyRoles } from "src/modules/role/useCase/getManyRoles";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@Controller("roles")
export class RoleController {
  constructor(private readonly createRole: CreateRole, private readonly listRoles: GetManyRoles) { }

  @Post()
  async create(@Body() role: CreateRoleBody): Promise<void> {
    await this.createRole.execute(role);
  }

  @Get()
  async list(@CurrentUser() user: any): Promise<Role[]> {
    console.log(' user', user);
    return await this.listRoles.execute({});
  }
}