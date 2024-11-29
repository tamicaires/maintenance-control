import { Body, Controller, Post } from "@nestjs/common";
import { AddServiceResponsible } from "src/application/employee-service-assigment/add-service-responsible";
import { CookiesEnum } from "src/core/enum/cookies";
import { Cookies } from "src/infra/http/auth/decorators/cookies.decorator";
import { AddEmployeeServiceAssigmentDto } from "./dtos/add-service-responsible-dto";
import { CompanyInstance } from "src/core/company/company-instance";

@Controller("employee-service-assigment")
export class EmployeeServiceAssigmentController {
  constructor(private readonly _addServiceResponsible: AddServiceResponsible) { }

  @Post()
  async addNewResponsible(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() body: AddEmployeeServiceAssigmentDto
  ) {
    const companyInstance = CompanyInstance.create(companyId)

    return this._addServiceResponsible.execute(companyInstance, body);
  }
}