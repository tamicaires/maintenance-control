import { Body, Controller, Post } from "@nestjs/common";
import { CreateManyRoleAssignment } from "src/modules/roleAssignment/useCases/createRoleAssigment";
import { AssignUserToRolesBody } from "./dtos/assignUserToRolesBody";

@Controller("role-assignment")
export class RoleAssignmentController {
  constructor(private readonly createManyRoleAssigment: CreateManyRoleAssignment) {}

  @Post()
  async createRoleAssignment(@Body() body: AssignUserToRolesBody) {
    // return this.createManyRoleAssigment.execute(body);
  }

  @Post("/many")
  async createMany(@Body() body: AssignUserToRolesBody){
    return this.createManyRoleAssigment.execute(body);
  }
}